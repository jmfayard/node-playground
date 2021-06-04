import express, {NextFunction, Request, Response} from "express";
import {ContactService} from "../formation/contactService";
import {fileSystemContactRepository} from "../formation/contactRepository";
import bodyParser from 'body-parser'
import {Contact} from "../formation/contact";
import {ContactDto} from "../formation/contactDto";
import {createHash} from "crypto"
import * as http from "http";
import {Server} from "socket.io"

const app = express()
    .use(bodyParser.json())
    .use('/public', express.static('express/public'))

const API = '/rest/contacts'

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: true,
    },
})


// Server
io.on("connection", (socket) => {
    socket.on("hello", (name) => {
        if (name) {
            console.log(`Hello de ${name} depuis le client`)
        } else {
            console.log("Hello du client")
        }
        socket.emit("hello", name)
    })
})

io.on('hello', (contacts) => {
    console.log("%O", contacts)
})

const service = new ContactService(fileSystemContactRepository)

function clientErrorHandler(err: any, req: any, res: any, next: any) {
    if (err) {
        res.status(400)
        res.send({message: err});
    } else {
        next(err)
    }
}

service.fetch().then(() => {
    console.log(service.contacts.length + ' contacts loaded')
    console.log('Open http://localhost:3000/hello')
    console.log('Open http://localhost:3000/id')
    console.log(`Open http://localhost:3000${API}`)
    app.use(clientErrorHandler)
    app.listen(3000)
})


app.get('/hello', (req: Request, res: Response) => {
    console.log('GET /hello')
    res.send("Hello World")
})

app.get(API, (req: Request, res: Response) => {
    console.log(`Get ${API}`)
    res.send(service.contacts)
})

app.post(API, (req: Request, res: Response, next: NextFunction) => {
    console.log('POST new contact %O', req.body)
    const contactDto = req.body as ContactDto
    const contact = new Contact(contactDto)
    service.add(contact)
        .then(() => {
            io.emit('contacts', service.contacts)
            res.send(contact)
        })
        .catch(next)
})

app.delete(`${API}/:id`, (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    console.log(`Delete contact ${id}`)
    service.delete(id).then(() => {
        io.emit('contacts', service.contacts)
        res.status(204)
        res.send('')
    }).catch(next);
});

app.put(`${API}/:id`, (req: Request, res: Response, next: NextFunction) => {
    console.log('PUT contact %O', req.body)
    const id = parseInt(req.params.id);
    const contactDto = req.body as ContactDto
    const contact = new Contact(contactDto)
    if (id != contact.id) {
        res.status(400)
        res.send({message: "incoherent contactId"})
        return
    }
    service.delete(id)
        .then(() => service.add(contact))
        .then(() => {
            io.emit('contacts', service.contacts)
            res.send(contact)
        }).catch(next);
})


app.get(`${API}/:id`, (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    console.log(`GET contact ${id}`)

    const contact = service.contactsById(id)
    if (contact) {
        res.send(contact)
    } else {
        res.status(404)
        res.send({message: `Invalid contactId=${id}`})
    }
})

app.get('/id', (req: Request, res: Response) => {
    const hash = createHash('sha256')
    hash.update(JSON.stringify(req.body))
    const result = hash.digest()
    res.send(result.toString("hex"))
})
