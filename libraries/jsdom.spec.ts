import {expect} from "chai";
import JSDOM from "jsdom";

describe('jsdom is a pure-Javascript implementation of the DOM and HTML for Node', function () {

    it('has a window', function () {
        const dom = new JSDOM.JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
        const text = dom.window.document.querySelector("p")?.textContent
        expect(text).to.eq('Hello world')
    });
});
