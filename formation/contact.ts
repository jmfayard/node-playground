import chalk from "chalk"
import exp from "constants";

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

export class ContactService {
    _memoryCache: Contact[] = []

    constructor() {
        const objects: ContactDto[] = require('./contacts.json')
        this._memoryCache = objects.map((dto) => new Contact((dto)))
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

export type PrintOptions = {
    colors: boolean
}
