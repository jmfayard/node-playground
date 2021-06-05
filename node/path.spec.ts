import {describe} from "mocha";
import {expect} from 'chai';
import path from "path";
import * as os from "os";

/**
 * https://nodejs.org/api/path.html
 * https://nodejs.org/api/os.html
 */
describe('works with path', function () {
    it('resolves current directory', function () {
        const currrent = path.resolve('.')
        console.log(currrent)
        expect(path.basename(currrent)).to.eq('node-playground')
    });

    it("shows the current platform", () => {
        const expected = ['aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32']
        console.log(os.platform())
        expect(os.platform()).to.be.oneOf(expected)
    })
});
