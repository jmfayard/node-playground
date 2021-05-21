import {describe} from "mocha";
import { expect } from 'chai';
import moment from "moment";

describe('MomentJS handle dates', () => {

    it('should be able to format dates', function () {
        const date = moment('2021-05-21 15:20:04').format('MMMM Do YYYY, h:mm:ss a');
        expect(date).to.equal("May 21st 2021, 3:20:04 pm")
    });
});
