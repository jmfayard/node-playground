import {expect} from "chai";
import pluralize from "pluralize";

/**
 * https://www.npmjs.com/package/pluralize
 */
describe('Pluralize and singularize any wod', function () {

    it('pluralize', function () {
        expect(pluralize('test', 1, true)).to.eq('1 test')
        expect(pluralize('test', 5, true)).to.eq('5 tests')
    });

    it('singular or plural?', function () {
        expect(pluralize.isPlural('test')).to.be.false
        expect(pluralize.isPlural('tests')).to.be.true
    });
});
