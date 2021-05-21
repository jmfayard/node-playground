import {pipe} from "fp-ts/function";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";

import {TaskEither} from "fp-ts/lib/TaskEither";
import { expect } from 'chai';

/**
 * [Introduction - fp-ts](https://gcanti.github.io/fp-ts/)
 * [gcanti/fp-ts: Functional programming in TypeScript](https://github.com/gcanti/fp-ts)
 */
describe('fp-ts : function programming in typescript', function () {

    function searchUser(search: string): TaskEither<Error, number> {
        if (search.length < 3) return TE.left(Error("Enter at least three characters"));
        if (search == 'nobody') return TE.right(2);
        return TE.right(5);
    }

    function fetchUserName(id: number): TaskEither<Error, string> {
        if (id == 2) {
            return TE.throwError(Error('User not found'));
        } else {
            return TE.of(`User ${id}`)
        }
    }

    it('should pipe task eithers', async function () {
        const user$ = pipe(
            42,
            fetchUserName
            )
        expect(await user$()).to.deep.equal(E.right('User 42'))
    })

    it('should chain task eithers', async function () {
        const user$ = pipe(
            'Louis',
            searchUser,
            TE.chain(
                (id) => fetchUserName(id)
            )
        )
        expect(await user$()).to.deep.equal(E.right('User 5'))
    })
});
