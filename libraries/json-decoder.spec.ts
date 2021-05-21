import {describe} from "mocha";
import { expect } from 'chai';
import {assert, number, object, Result, string, StructError} from "superstruct";
import {
    arrayDecoder,
    Err,
    ERR,
    err,
    nullDecoder,
    numberDecoder,
    objectDecoder,
    ok,
    OK,
    stringDecoder
} from "json-decoder";

/**
 * Enforcing JSON Type Safety
 * how to safeguard your project from unreliable JSON input
 * Art Deineka @darkest_ruby
 * https://github.com/venil7/json-decoder
 * https://darkruby.co.uk/json-decoder/#/
 */
describe('json-decoder enforces JSON Type safety', () => {

    it('validates basic types', function () {
        expect(stringDecoder.decode("hello").type).to.eq('OK')
        expect(numberDecoder.decode(42).type).to.eq('OK')
        expect(nullDecoder.decode(null).type).to.eq('OK')
        expect(arrayDecoder(numberDecoder).decode([1,2]).type).to.eq('OK')
    });

    it('fails on incorrect basic types', function () {
        expect(stringDecoder.decode(123.45).type).to.eq('ERR')
        expect(numberDecoder.decode("FR").type).to.eq('ERR')
        expect(nullDecoder.decode(42).type).to.eq('ERR')
        expect(arrayDecoder(numberDecoder).decode(123.45).type).to.eq('ERR')
    });

    it('validates valid objects', function () {
        const linda: Pet = {age: 5, name: 'Linda'}
        expect(petDecoder.decode(linda).type).eq('OK')
    });

    it('invalidates invalid objects', function () {
        const validation = petDecoder.decode({age: 3, nom: 'Pat'}) as Err<Pet>
        expect(validation.message).eq('name: expected string, got undefined')
    });


});

type Pet = {name: string, age: number};
const petDecoder = objectDecoder<Pet>({
    name: stringDecoder,
    age: numberDecoder,
});
