import {expect} from "chai";
import showdown from "showdown";
import * as jsdom from "jsdom";

describe('showdown - javascript markdown to HTML converter', function () {

    it('Markdown to HTML', function () {
        const converter = new showdown.Converter({ghCodeBlocks: true})
        const html = converter.makeHtml('## Hello markdown');
        expect(html).to.eq('<h2 id="hellomarkdown">Hello markdown</h2>')
    });

    it('HTML to markdown', function () {
        const dom = new jsdom.JSDOM();
        const converter = new showdown.Converter({ghCodeBlocks: true})
        const markdown = converter.makeMarkdown('<a href="https://patreon.com/showdownjs">Please Support us!</a>', dom.window.document);
        expect(markdown).to.eq('[Please Support us!](<https://patreon.com/showdownjs>)')
    })

});

