import chalk from "chalk";
import {ContactDto} from "./contactDto";
import {Contact} from "./contact";
import {ContactRepository} from "./contactRepository";

const doNothing = () => {
}

export type PrintOptions = {
    colors: boolean
}

export class ContactService {
    _memoryCache: Contact[] = []

    constructor(private repository: ContactRepository, done: (() => void) = doNothing) {
        repository.fetchContacts((err, result) => {
            if (err != null) throw err
            this._memoryCache = result.map((dto) => new Contact((dto)))
            done()
        })
    }

    get contacts() {
        return this._memoryCache
    }

    print({colors = false}: PrintOptions) {
        const formatter = chalk.bgGray.bold
        this._memoryCache.forEach((c) => {
            let message: string
            if (colors) {
                message = `#${c.id} ${formatter.blue(c.lastName.toUpperCase() + " ")}${formatter.red(c.firstName)} (📞 ${c.phone} 🗺 ${c.address})`;
            } else {
                message = `#${c.id} ${c.lastName.toUpperCase()} ${c.firstName} (📞 ${c.phone} 🗺 ${c.address})`;
            }
            console.log(message);
        })
    }

    add(contact: Contact, callback: FsCallback<void>): void {
        this._memoryCache.push(contact)
        this.repository.write(this.contacts, callback)
    }

    delete(contactId: number, callback: FsCallback<void>): void {
        this._memoryCache = this._memoryCache.filter((value, index) => value.id != contactId)
        this.repository.write(this.contacts, callback)
    }


    execute(v: { 'action': string, 'firstName': string, 'id': string, 'lastName': string, 'colors': boolean },
            callback: FsCallback<void>) {
        const command = v['action']
        if (command == 'add') {
            const contactDto = {...v, "id": parseInt(v.id)} as unknown as ContactDto
            const contact = new Contact(contactDto)
            this.add(contact, callback)
        } else if (command == 'delete') {
            this.delete(parseInt(v['id']), callback)
        } else if (command != 'list') {
            console.log('Invalid parameter --action=' + command)
        }
        this.print({colors: v['colors']})
    }
}

export type FsCallback<Type> =
    (err: Error | null, result: Type) => void
