import {describe} from "mocha";
import {expect} from 'chai';

/**
 * See https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 */
describe('Everyday Types include', function () {

    it('object types and optional properties', function () {
        function name(obj: {
            first: string,
            last?: string
        }): string {
            if (obj.last == null) return obj.first
            else return `${obj.first} ${obj.last}`
        }

        expect(name({first: "JM"})).to.equal("JM")
        expect(name({first: "JM", last: "Fayard"})).to.equal("JM Fayard")
    });

    it('Union types', function () {

        function idOf(id: number | string): string {
            return "Your ID is " + id
        }

        expect(idOf(42)).to.equal("Your ID is 42")
        expect(idOf("42")).to.equal("Your ID is 42")
    });

    it('Type Aliases', function () {
        function distanceFromZero(point: Point): number {
            return Math.sqrt(point.x * point.x + point.y * point.y)
        }

        const point: Point = {x: 3, y: 4};
        expect(distanceFromZero(point)).to.equal(5)

    })

    it('Literal Types', function () {
        function printText(s: string, alignment: "left" | "right" | "center"): string {
            return `${s} (${alignment})`
        }

        function compare(a: string, b: string): -1 | 0 | 1 {
            return a === b ? 0 : a > b ? 1 : -1;
        }

        // printText("hola", "centre") // does not compile!
        expect(printText("hola", "center")).to.equal("hola (center)")

        expect(compare("a", "b")).to.equal(-1)
    });
});

type Point = { x: number, y: number }
