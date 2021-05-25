import {beforeEach, describe} from "mocha";
import {expect} from 'chai';

// https://nodejs.org/dist/latest-v14.x/docs/api/process.html
describe('Process', function () {

    it('cwd() gets working directory', function () {
        expect(process.cwd()).to.contain('node-playground')
    });

    it('argv argv0 arch ', function () {
        expect(process.argv).to.eq('node')
        expect(process.argv[1]).to.contain('mocha')
        expect(process.arch).to.be('x64')
        expect(process.pid).to.be.greaterThan(1)
    });
});
