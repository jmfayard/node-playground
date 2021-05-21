import {describe} from "mocha";
import {expect} from 'chai';

describe('Array functions', function () {

    const ints = [1, 2, 3, 4, 5, 6];

    it('concat', function () {
        const array = [1, 2, 3].concat(4, 5, 6);
        expect(array).to.deep.equal(ints)
    });

    it('every', function () {
        const lessThanTen = ints.every((e) => e < 10);
        expect(lessThanTen).to.be.true
    });

    it('some', function () {
        const someMoreThanTen = ints.some((e) => e >= 10);
        expect(someMoreThanTen).to.be.false
    });


    it('filter', function () {
        const odds = ints.filter((i) => i % 2 == 1);
        expect(odds).to.deep.equal([1, 3, 5])
    });

    it('forEach', function () {
        let sum = 0
        ints.forEach((value) => sum += value)
        expect(sum).to.eq(21)
    });

    it('reduce', function () {
        const sum = ints.reduce((acc, i) => acc + i, 0)
        expect(sum).to.eq(21)
    });

    it('reduceRight', function () {
        const sum = ints.reduceRight((acc, i) => acc + i, 0)
        expect(sum).to.eq(21)
    });

    it('sort', function () {
        const unordered = [2, 4, 3, 1, 6, 5];
        expect(unordered.sort()).to.deep.equal(ints)
    });
});

