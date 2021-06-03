import {ContactDto} from "./contactDto";

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


