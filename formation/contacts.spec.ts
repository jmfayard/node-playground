import {expect} from 'chai';

const data: Contact[] = require('./contacts.json')

describe('works with contacts', function () {

    it('has a toString', function () {
        const contact = new Contact({id: 0, firstName: "Jean", lastName: "Michel", phone: "06", address: "Paris"})
        expect(contact.toString()).to.eq("{\"id\":0,\"firstName\":\"Jean\",\"lastName\":\"Michel\",\"address\":\"Paris\",\"phone\":\"06\"}")
    });

    it('reads the 8 contacts', function () {
        expect(data.map((c) => c.id)).to.deep.eq([0, 1, 2, 3, 4, 5, 6, 7])
    });

    it('prints contacts with the contact service', () => {
        const service = new ContactService()
        service.print()
    })
});

interface ContactDto {
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    phone: string
}

class Contact {
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

class ContactService {
    _memoryCache: Contact[] = []

    constructor() {
        const objects: ContactDto[] = require('./contacts.json')
        this._memoryCache = objects.map((dto) => new Contact((dto)))
    }

    get contacts() {
        return this._memoryCache
    }

    print() {
        this._memoryCache.forEach((c) => console.log(c.toString()))
    }


}
