import {describe} from "mocha";
import {expect} from 'chai';

/**
 * https://www.typescriptlang.org/docs/handbook/2/objects.html
 */
describe('Object types', function () {
    const jm: Person = {name: "Jean-Michel", age: 49}
    const mc: Person = {name: "Marie-Claire", age: 33, title: "Herr Doctor Professor"}

    it('Dictionary pattern', function () {
        const family: Family = {jm, mc}
        expect(family.jm).to.eq(jm)
        expect(family["mc"]).to.eq(mc)

    });

    it('Generic interfaces', function () {
        interface Box<Type> {
            contents: Type,
        }

        function setContents<Type>(box: Box<Type>, contents: Type) {
            box.contents = contents
        }

        type numberBox = Box<number>
        const boxed: numberBox = {contents: 23}
        setContents(boxed, 42)
        expect(boxed.contents).to.eq(42)
    });

    it('Readonly array', function () {
        function sum(integers: readonly number[]) {
            return integers.reduce((previous, current) => previous + current, 0)
        }

        const ints: readonly number[] = [1, 2, 3, 4]
        expect(sum(ints)).to.eq(10)
        expect(sum([1, 2, 3, 4])).to.eq(10)
    });

    it('Readonly Tuple Types', function () {
        function Person(params: CreatePerson): Person {
            const [name, age] = params
            return {name, age}
        }

        expect(Person(['Toto', 7])).to.deep.equal({name: 'Toto', age: 7})
    });

})

type CreatePerson = [string, number]

interface Person extends HasName {
    title?: string,
    age: number,
}

interface HasName {
    readonly name: string
}

type Family = {
    [index: string]: Person,
}
