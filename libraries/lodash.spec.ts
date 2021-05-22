import {expect} from "chai";
import _ from "lodash";
import JSON = Mocha.reporters.JSON;

describe('lodash - A modern JavaScript utility library', function () {

    it('map join', function () {
        const names = _.map(users, (u) => u.fullname).join(' - ')
        expect(names).to.eq('Jean-Michel - Louis - Alice')
    });

    it('take takeRight drop', function () {
        expect(_.take(users, 2)).to.deep.equal([jm, louis])
        expect(_.takeRight(users, 2)).to.deep.equal([louis, alice])
        expect(_.drop(users, 2)).to.deep.equal([alice])
    });

    it('slice', function () {
        expect(_.slice(orders, 3, 6)).to.deep.equal(aliceOrders)
    });

    it('union', function () {
        expect(_.union([2], [1, 2])).to.deep.equal([2, 1])
    });


    it('zip', function () {
        const zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
        expect(zipped).to.deep.equal([['a', 1, true], ['b', 2, false]])
    });


    it('uniq', function () {
        const names = _.uniqBy(orders, (o) => o.user)
            .map((o) => o.user.fullname)
        expect(names).to.deep.equal(['Jean-Michel', 'Alice', 'Louis'])
    });

    it('flatMap', function () {
        function duplicate(n: number) {
            return [n, n];
        }

        const duplicates = _.flatMap([1, 2], duplicate);
        expect(duplicates).to.deep.eq([1, 1, 2, 2])
    });

    it('reduce', function () {
        const totalPrice = _.reduce(orders, (sum, o) => sum + o.price, 0)
        expect(totalPrice).to.eq(74)
        expect(_.sumBy(orders, (o) => o.price)).to.eq(74)
    });

    it('shuffle sort', function () {
        const sorted = _.shuffle([1, 4, 3, 2]).sort();
        expect(sorted).to.deep.eq([1, 2, 3, 4])
    });
});


class Order {
    constructor(public name: string, public price: number, public user: User) {
    }
}

class User {
    constructor(public fullname: string, public age: number) {
    }
}

const jm = new User("Jean-Michel", 39)
const louis = new User("Louis", 25)
const alice = new User("Alice", 6)
const users = [jm, louis, alice]
const names = ["apple", "orange", "bananas"]
const jmOrders = names.map((name) => new Order(name, 12, jm))
const aliceOrders = names.map((name) => new Order(name, 6, alice))
const louisOrders = [new Order('peach', 20, louis)]
const orders = jmOrders.concat(...aliceOrders).concat(...louisOrders)
