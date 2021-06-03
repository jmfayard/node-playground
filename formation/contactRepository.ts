import fs from "fs/promises";
import {ContactDto} from "./contactDto";
import {Contact} from "./contact";

export interface ContactRepository {
    fetchContacts(): Promise<ContactDto[]>

    write(contacts: Contact[]): Promise<void>
}

export const requireContactRepository: ContactRepository = {
    write(_: Contact[]): Promise<void> {
        return Promise.reject(new Error("Cannot write contacts with requireContactRepository"));
    },
    fetchContacts(): Promise<ContactDto[]> {
        const objects: ContactDto[] = require('./contacts.json');
        return Promise.resolve(objects);
    }
}
const FILE = 'formation/contacts.json'
export const fileSystemContactRepository: ContactRepository = {

    write(contacts: Contact[]): Promise<void> {
        return fs.writeFile(FILE, JSON.stringify(contacts, null, "    "))
    },

    fetchContacts(): Promise<ContactDto[]> {
        return fs.readFile(FILE, {encoding: "utf-8"})
            .then(content => JSON.parse(content))
    }
}
