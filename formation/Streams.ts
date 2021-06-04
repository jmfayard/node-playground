import {Contact} from "./contact";
import fs from "fs";
import fsP from "fs/promises";
import {ContactDto} from "./contactDto";
import {ContactRepository} from "./contactRepository";
import JSONStream from "JSONStream"
import through2 from "through2";

const FILE = 'formation/contacts.json'

export const streamedContactRepository: ContactRepository = {

    async write(contacts: Contact[]): Promise<void> {
        await fsP.writeFile(FILE, JSON.stringify(contacts, null, "    "))
    },

    read(callback: (contacts: ContactDto[]) => void): void {
        const contacts: Contact[] = []
        const transform = through2(function (chunk, enc, done) {
            this.push(new Contact(chunk as ContactDto))
            done()
        })

        const stream = fs.createReadStream(FILE)
            .pipe(JSONStream.parse('*'))
            .pipe(transform)
        stream.on('end', () => callback.done(contacts))
    },

    async fetchContacts(): Promise<ContactDto[]> {
        return new Promise((resolve, reject) => {
            streamedContactRepository.read(
                (contacts) => resolve(contacts)
            );
        });
    }


}
