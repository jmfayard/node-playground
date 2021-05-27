import {describe} from "mocha";
import {expect} from 'chai';
import {string} from "fp-ts";

/**
 * https://www.typescriptlang.org/docs/handbook/2/functions.html
 */
describe('More on functions', function () {

    it('Function Type Expressions', () => {
        type GreetFunction = (message: string) => void

        function greeter(fun: GreetFunction) {
            fun("Hello World!")
        }

        let sideeffect: string = ''
        greeter((message) => sideeffect = message)
        expect(sideeffect).to.eq('Hello World!')
    })

    it('Call Signature', () => {
        type DescribableFunction = {
            description: string;
            greet(message: string): void;
        };

        function greeter(fun: DescribableFunction) {
            fun.greet(`${fun.description} says Hello World!`)
        }

        let sideeffect: string = ''
        greeter({
            greet: (message: string): void => {
                sideeffect = message;
            },
            description: 'SideEffect',
        })
        expect(sideeffect).to.eq('SideEffect says Hello World!')
    })

    it('Generic function', function () {
        function firstElement<Type>(array: Type[]): Type {
            return array[0];
        }

        expect(firstElement([1, 2, 3])).to.eq(1)
        expect(firstElement(["Hello", "World"])).to.eq("Hello")

        function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
            return arr.map(func);
        }

        const parsed = map(["1", "2", "3"], (n) => parseInt(n));
        expect(parsed).to.deep.equal([1, 2, 3])
    });

    it('Constaints', () => {
        function longest<Type extends { length: number }>(a: Type, b: Type) {
            if (a.length >= b.length) {
                return a;
            } else {
                return b;
            }
        }

        // Both number[] and string have a property length
        const longerArray = longest([1, 2], [1, 2, 3]);
        expect(longerArray).to.deep.equal([1, 2, 3])
        const longerString = longest("alice", "bob");
        expect(longerString).to.equal('alice')

        // DOES NOT COMPILE
        // const notOK = longest(10, 100);
    })


});
