import {expect} from "chai";

describe('memoized fibonacci', function () {

    it('works for small numbers', function () {
        var fibos = [1, 1, 2, 3, 5, 8]
        fibos.forEach((value, index) =>
            expect(fib(index)).to.eq(value)
        )
    });

    it('works fast for large numbers', function () {
        expect(fib(30)).to.eq(1346269)
    });
});

const memory: IHash = {}
interface IHash {
    [key: number]: number
}
function fibM(n: number): number {
    if (memory.hasOwnProperty(n)) return memory[n]
    const compute = fib(n)
    memory[n] = compute
    return compute
}

function fib(n: number): number {
    if (n <= 1) return 1
    return fibM(n - 1) + fibM(n - 2);
}
