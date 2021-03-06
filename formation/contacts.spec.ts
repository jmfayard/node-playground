import {expect} from 'chai';
import {Contact} from "./contact";
import {Command} from "commander";
import {ContactService, PrintOptions} from "./contactService";
import {fileSystemContactRepository, requireContactRepository} from "./contactRepository";


const data: Contact[] = require('./contacts-initial.json')

describe('works with contacts', function () {

    it('has a toString', function () {
        const contact = new Contact({id: 0, firstName: "Jean", lastName: "Michel", phone: "06", address: "Paris"})
        expect(contact.toString()).to.eq("{\"id\":0,\"firstName\":\"Jean\",\"lastName\":\"Michel\",\"address\":\"Paris\",\"phone\":\"06\"}")
    });

    it('reads the 8 contacts', function () {
        expect(data.map((c) => c.id)).to.deep.eq([0, 1, 2, 3, 4, 5, 6])
    });

    it('prints contacts with the contact service', () => {
        const service = new ContactService(requireContactRepository)
        service.print({} as PrintOptions)
    })

    it('can parse arguments', function () {
        const program = parseProgramArgs(["node", "file", "--colors"])
        const options = program.opts();
        console.log("options=%O", options)
        const service = new ContactService(requireContactRepository)
        service.print(options as PrintOptions)
    });

    it('use a repository to access the contacts', async function () {
        const service = new ContactService(fileSystemContactRepository)
        await service.fetch()
        console.log('done getting contacts')
        service.print({colors: true})
    })
});

function parseProgramArgs(argv: string[]): Command {
    const program: any = new Command();
    program.option('--colors', "use colors")
    program.parse(argv)
    return program as Command
}
