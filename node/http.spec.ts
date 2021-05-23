import {beforeEach, describe} from "mocha";
import {expect} from 'chai';
import * as http from "http";
import {Agent} from "http";
import * as querystring from "querystring";

describe('it should do HTTP calls', function () {

    let client: Agent;
    before(function () {
        client = new http.Agent({keepAlive: true});
    });

    after(function () {
        client.destroy()
    });

    it('http get', async function () {
        http.get('http://httpbin.org/get', (res) => {
            const {statusCode} = res;
            const contentType = res.headers['content-type'];
            expect(statusCode).to.eq(200);
            expect(contentType).to.contain('json');
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    expect(parsedData).to.have.property('origin')
                    expect(parsedData.url).to.eq('http://httpbin.org/get')
                } catch (e) {
                    expect(`Got error: ${e.message}`).to.be.null
                }
            })
        }).on('error', (e) => {
            expect(`Got error: ${e.message}`).to.be.null
        });
    });

    it('http post', async function () {
        const req = http.request(
            'http://httpbin.org/post',
            {
                method: 'POST',
                timeout: 1000,
                headers: {
                    'X-JMF': 'true',
                }
            },
            (res) => {

                const {statusCode} = res;
                const contentType = res.headers['content-type'];
                expect(statusCode).to.eq(200);
                expect(contentType).to.contain('json');
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => {
                    rawData += chunk;
                });

                res.on('end', () => {
                    let parsedData: any;
                    try {
                        parsedData = JSON.parse(rawData);
                    } catch (e) {
                        expect(`Got error: ${e.message}`).to.be.null
                    }
                    expect(parsedData.data).to.eq('msg=Hello%20World!')
                    expect(parsedData).to.have.property('origin')
                    expect(parsedData.url).to.eq('http://httpbin.org/post')

                })
            }).on('error', (e) => {
            expect(`Got error: ${e.message}`).to.be.null
        });
        const postData = querystring.stringify({
            'msg': 'Hello World!'
        });
        // Write data to request body
        req.write(postData);
        req.end();
    })

});
