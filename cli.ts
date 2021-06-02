#!/usr/bin/env ts-node

import {
    Contact,
    ContactService,
    fileSystemContactRepository,
    PrintOptions,
    requireContactRepository
} from "./formation/contact";
import {Command} from "commander";
import common from "mocha/lib/interfaces/common";

const program: any = new Command();
program.requiredOption('--action <action>', "add|delete|print")
program.option('--colors', "use colors")
program.option('--id <id>', 'id to delete')
program.option('--lastName <lastName>', 'lastName')
program.option('--firstName <firstName>', 'firstNameName')
program.parse(process.argv);
const service = new ContactService(fileSystemContactRepository, () => {
    service.execute(program.opts(), () => {

    })
})
