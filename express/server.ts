import {Request, Response} from "express";
import {ContactService} from "../formation/contactService";
import {fileSystemContactRepository} from "../formation/contactRepository";
import bodyParser from 'body-parser'
import {Contact} from "../formation/contact";
import {ContactDto} from "../formation/contactDto";

const express = require("express")


const app = express()
    .use(bodyParser.json())

const API = '/rest/contacts'

const service = new ContactService(fileSystemContactRepository, () => {
    console.log(service.contacts.length + ' contacts loaded')
    console.log('Open http://localhost:3000/hello')
    console.log(`Open http://localhost:3000${API}`)
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

app.post(API, (req: Request, res: Response) => {
    console.log('POST new contact %O', req.body)
    const contactDto = req.body as ContactDto
    const contact = new Contact(contactDto)
    service.add(contact, () => {
        res.send(contact)
    })
})

app.delete(`${API}/:id`, (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log(`Delete contact ${id}` )
    service.delete(id, () => {
        res.status(204)
        res.send('')
    })
});

app.put(`${API}/:id`, (req: Request, res: Response) => {
    console.log('PUT contact %O', req.body)
    const id = parseInt(req.params.id);
    const contactDto = req.body as ContactDto
    const contact = new Contact(contactDto)
    if (id != contact.id) {
        res.status(400)
        res.send({ message: "incoherent contactId" })
        return
    }
    service.delete(id, () => {
        service.add(contact, () => {
            res.send(contact)
        })
    })
});


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


