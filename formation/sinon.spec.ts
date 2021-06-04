import {expect} from 'chai';
import {describe} from "mocha";
import sinon from 'sinon';

describe('Fake and spies', function () {

    it("calls the original function", function () {
        const callback = sinon.fake();
        const proxy = once(callback);

        proxy();

        expect(callback.called).to.be.true;
    });

    it("calls the original function only once", function () {
        const callback = sinon.fake();
        const proxy = once(callback);

        proxy();
        proxy()
        proxy()

        expect(callback.callCount).to.eq(1);
    });

    it("returns the return value from the original function", function () {
        const callback = sinon.fake.returns(42);
        const proxy = once(callback);

        expect(proxy()).to.eq(42);
    });

});


function once(fn: () => number) {
    let returnValue: number
    let called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn();
        }
        return returnValue;
    };
}
