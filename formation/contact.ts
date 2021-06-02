import chalk from "chalk"
import * as fs from "fs";

export interface ContactDto {
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    phone: string
}

export class Contact {
    id: number
    firstName: string
    lastName: string
    address: string
    phone: string

    constructor({id, firstName, lastName, address, phone}: ContactDto) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.address = address
        this.phone = phone
    }

    toString(): string {
        const {id, firstName, lastName, address, phone} = this
        return JSON.stringify({id, firstName, lastName, address, phone})
    }
}

const doNothing = () => {}
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
}

export type FsCallback<Type> =
    (err: Error | null, result: Type) => void

export interface ContactRepository {
    fetchContacts(callback: FsCallback<ContactDto[]>): void
}

export const requireContactRepository: ContactRepository = {
    fetchContacts(callback: FsCallback<ContactDto[]>) {
        const objects: ContactDto[] = require('./contacts.json');
        callback(null, objects)
    }
}


export const fileSystemContactRepository: ContactRepository = {
    fetchContacts(callback: FsCallback<ContactDto[]>) {
        fs.readFile('formation/contacts.json', {encoding: "utf-8"}, (err, content) => {
            if (err != null) {
                callback(err, [])
            } else {
                callback(null, JSON.parse(content))
            }
        })
    }
}

/**
 *  fs.open('res/groceries.txt', 'r')
 const buffer = await fileHandle.readFile()
 const lines = buffer.toString("utf-8")
 */

export type PrintOptions = {
    colors: boolean
}
