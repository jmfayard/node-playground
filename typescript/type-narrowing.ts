import {describe} from "mocha";
import {expect} from 'chai';

/**
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 */
describe('Narrowing of union types', function () {

    it('typeof narrowing', function () {
        expect(printAll(null)).to.be.eq('null')
        expect(printAll('ok')).to.be.eq('ok')
        expect(printAll(['apple ', 'cherry'])).to.be.eq('apple cherry')
    });

    function printAll(strs: string | string[] | null): string {
        if (strs == null) {
            return 'null'
            // beware: typeof null === 'object' !!!
        } else if (typeof strs === "object") {
            let concat = ''
            for (const s of strs) {
                concat += s
            }
            return concat
        } else {
            return strs
        }
    }


    it('in narrowing', function () {
        const fish: Fish = {swim: () => 'water is good'};
        expect(move(fish)).to.be('water is good')
    });

    function move(animal: Fish | Bird) {
        if ("swim" in animal) {
            // type narrowing: animal is now a Fish
            return animal.swim();
        }
        // by analysis of the flow, here animal is a Bird
        return animal.fly();
    }

    type Fish = { swim: () => string };
    type Bird = { fly: () => string };


    it('Using type predicates', function () {
        const fish = getSmallPet();
        let actual: string
        if (isFish(fish)) { // <-- use a type predicate
            actual = fish.swim()
        } else {
            actual = fish.fly()
        }
        expect(actual).to.eq('water is good')
    });

    function getSmallPet(): Fish | Bird { // <-- define a type predicate
        return {swim: () => 'water is good'};
    }

    function isFish(pet: Fish | Bird): pet is Fish {
        return (pet as Fish).swim !== undefined;
    }

    it('the never type', function () {
        const shape: Shape = {kind: "square", sideLength: 10}
        expect(getArea(shape)).to.eq(100)
    });

    type Shape = Circle | Square;

    // type Shape = Circle | Square | Triangle; // <-- compilation error

    interface Circle {
        kind: "circle";
        radius: number;
    }

    interface Square {
        kind: "square";
        sideLength: number;
    }

    interface Triangle {
        kind: "triangle";
        sideLength: number;
    }

    function getArea(shape: Shape) {
        switch (shape.kind) {
            case "circle":
                return Math.PI * shape.radius ** 2;
            case "square":
                return shape.sideLength ** 2;
            default:
                const _exhaustiveCheck: never = shape; // <-- exhaustive check
                return _exhaustiveCheck;
        }
    }


});

