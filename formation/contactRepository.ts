import fs from "fs/promises";
import {ContactDto} from "./contactDto";
import {Contact} from "./contact";

export interface ContactRepository {
    fetchContacts(): Promise<ContactDto[]>

    write(contacts: Contact[]): Promise<void>
}

export const requireContactRepository: ContactRepository = {
    async write(_: Contact[]): Promise<void> {
        return Promise.reject(new Error("Cannot write contacts with requireContactRepository"));
    },
    async fetchContacts(): Promise<ContactDto[]> {
        return require('./contacts.json');
    }
}
const FILE = 'formation/contacts.json'
export const fileSystemContactRepository: ContactRepository = {

    async write(contacts: Contact[]): Promise<void> {
        await fs.writeFile(FILE, JSON.stringify(contacts, null, "    "))
    },

    async fetchContacts(): Promise<ContactDto[]> {
        const content = await fs.readFile(FILE, {encoding: "utf-8"})
        return JSON.parse(content)
    }
}

