#!/usr/bin/env ts-node

import {Command} from "commander";
import {ContactService} from "./formation/contactService";
import {fileSystemContactRepository} from "./formation/contactRepository";

const program: any = new Command();
program.requiredOption('--action <action>', "add|delete|print")
program.option('--colors', "use colors")
program.option('--id <id>', 'id to delete')
program.option('--lastName <lastName>', 'lastName')
program.option('--firstName <firstName>', 'firstNameName')
program.parse(process.argv);


async function main() {
    const service = new ContactService(fileSystemContactRepository)
    await service.fetch()
    await service.execute(program.opts())
}
main()
