import example, {User, UserSex} from './example';
import {describe} from "mocha";
import { expect } from 'chai';

describe('Example', () => {
    const TEST_USER: User = {
        age: 18,
        name: 'fou',
        sex: UserSex.OTHER,
    };

    it('should give true when user is adult', function () {
        const user = new example(TEST_USER);

        expect(user.isAdult()).to.equal(true);
    });


    it('should give false when user is child', function () {
        const testUser = TEST_USER;
        testUser.age = 11;

        const user = new example(testUser);

        expect(user.isAdult()).to.equal(false);
    });
});
