import chalk from "chalk";
import {ContactDto} from "./contactDto";
import {Contact} from "./contact";
import {ContactRepository} from "./contactRepository";


export type PrintOptions = {
    colors: boolean
}

export class ContactService {
    _memoryCache: Contact[] = []

    constructor(private repository: ContactRepository) {
    }

    async fetch(): Promise<void> {
        const contacts = await this.repository.fetchContacts()
        this._memoryCache = contacts.map((dto) => new Contact((dto)))
    }

    get contacts() {
        return this._memoryCache
    }

    contactsById(id: number) {
        return this._memoryCache.find((c: Contact) => c.id == id)
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

    async add(contact: Contact) {
        this._memoryCache.push(contact)
        await this.repository.write(this.contacts)
    }

    async delete(contactId: number): Promise<void> {
        this._memoryCache = this._memoryCache.filter((value, index) => value.id != contactId)
        await this.repository.write(this.contacts)
    }


    async execute(v: { 'action': string, 'firstName': string, 'id': string, 'lastName': string, 'colors': boolean })
        : Promise<void> {
        const command = v['action']
        if (command == 'add') {
            const contactDto = {...v, "id": parseInt(v.id)} as unknown as ContactDto
            const contact = new Contact(contactDto)
            await this.add(contact)
        } else if (command == 'delete') {
            await this.delete(parseInt(v['id']))
        } else if (command != 'list') {
            console.log('Invalid parameter --action=' + command)
        }
        this.print({colors: v['colors']})
    }
}
