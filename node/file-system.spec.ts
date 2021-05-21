import {FileHandle} from "fs/promises";

const fs = require('fs/promises');
import { expect } from 'chai';
import {constants, Dir, Dirent} from "fs";

// https://nodejs.org/dist/latest-v14.x/docs/api/fs.html
describe('fs node api', function () {

    const groceries = "- apple\n- lemon\n";

    it('open a file', async function () {
        const fileHandle: FileHandle = await fs.open('res/groceries.txt', 'r')
        const buffer = await fileHandle.readFile()
        expect(buffer.toString()).to.eq(groceries)
    });

    it('reads a directory', async function () {
        const dir: Dir = await fs.opendir('res', {encoding: "utf-8"})
        let entries: Dirent[] = []
        while (true) {
            const file = await dir.read()
            if (file == null) break;
            entries.push(file)
        }
        await dir.close()
        const filenames = entries.map((d) => d.name as string)
        expect(filenames).to.include('groceries.txt')
    });

    it('checks if file exists', async function () {
        await fs.access('res/groceries.txt', constants.F_OK)

        try {
            await fs.access('res/INVALID.txt', constants.F_OK)
            expect.fail('expected INVALID file to be not accessible')
        } catch (e) {
            // OK
        }
    });
});
