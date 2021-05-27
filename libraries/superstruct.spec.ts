import {describe} from "mocha";
import {expect} from 'chai';
import {assert, number, object, string, StructError} from "superstruct";

/**
 * https://docs.superstructjs.org/
 * https://github.com/ianstormtaylor/superstruct
 */
describe('Superstruct valides your data', () => {

    it('validates a correct user', function () {
        const user = {
            id: 42,
            name: 'Jane Smith',
            email: 'jane@example.com',
        }
        assert(user, User)
    });

    it('fails for an incorrect user', function () {
        const user = {
            id: "21",
            name: 42,
            email: 'jane@example.com',
        }
        const invalid = function () {
            assert(user, User)
        }
        expect(invalid).to.throw(StructError)
    });
});

const User = object({
    id: number(),
    name: string(),
    email: string(),
})
