import {describe} from "mocha";
import {expect} from 'chai';
import {exec, spawn} from "child_process";

// https://nodejs.org/dist/latest-v14.x/docs/api/child_process.html
describe('child_process allows to spawn external commands like popen', function () {

    const groceries = "- apple\n- lemon\n";

    it('spawn an external command', function () {
        const command = spawn('cat', ['res/groceries.txt'])
        command.stdout.on('data', (data) => {
            expect(data.toString()).to.eq(groceries)
        });
    });

    it('exec an external command', function () {
        exec('cat res/groceries.txt', (error, stdout, stderr) => {
            expect(error).to.be.null
            expect(stderr).to.be.empty
            expect(stdout).to.eq(groceries)
        })
    });
});
