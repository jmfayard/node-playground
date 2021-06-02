import {expect} from 'chai';
import {Contact, ContactService} from "./contact";
import {Command} from "commander";


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

    it('can parse arguments', function () {
        const program = parseProgramArgs(["node", "file", "--colors"])
        const options = program.opts();
        console.log("options=%O", options)
        const service = new ContactService()
        service.print(options.colors)
    });
});

function parseProgramArgs(argv: string[]): Command {
    const program: any = new Command();
    program.option('--colors', "use colors")
    program.parse(argv)
    return program as Command
}
