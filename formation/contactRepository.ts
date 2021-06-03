import {FsCallback} from "./contactService";
import fs from "fs";
import {ContactDto} from "./contactDto";
import {Contact} from "./contact";

export interface ContactRepository {
    fetchContacts(callback: FsCallback<ContactDto[]>): void

    write(contacts: Contact[], callback: FsCallback<void>): void
}

export const requireContactRepository: ContactRepository = {
    write(contacts: Contact[], callback: FsCallback<void>): void {
        throw new Error("Cannot write contacts with requireContactRepository")
    },
    fetchContacts(callback: FsCallback<ContactDto[]>) {
        const objects: ContactDto[] = require('./contacts.json');
        callback(null, objects)
    }
}
const FILE = 'formation/contacts.json'
export const fileSystemContactRepository: ContactRepository = {

    write(contacts: Contact[], callback: FsCallback<void>): void {
        fs.writeFile(FILE, JSON.stringify(contacts), err => {
            callback(err, undefined)
        })
    },

    fetchContacts(callback: FsCallback<ContactDto[]>) {
        fs.readFile(FILE, {encoding: "utf-8"}, (err, content) => {
            if (err != null) {
                callback(err, [])
            } else {
                callback(null, JSON.parse(content))
            }
        })
    }
}
