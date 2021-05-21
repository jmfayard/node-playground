import {expect} from "chai";
import {gql, request} from "graphql-request";

/**
 * https://graphql.org/
 * https://github.com/prisma-labs/graphql-request
 * https://tmdb.apps.quintero.io
 */
describe('GraphQL', function () {

    it('should fetch movies', async function () {
        const result = await request('https://tmdb.apps.quintero.io', query)
        expect(result.error).to.be.undefined
        const transform: string[] = result.search.edges.map(
            (node: Node) => node.node.title
        );
        expect(transform).to.include('Star Wars: The Last Jedi').and.include('Star Wars: The Rise of Skywalker')
    });

});

const query = gql`
query {
  search(term: "Star Wars") {
    edges {
      cursor, 
      __typename, 
      node {
        __typename
        ... on Movie {
          title
        }
      }
    }
  }
}
`
interface Node {
    __typename: string,
    cursor: string,
    node: Movie,
}
interface Movie {
    __typename: string,
    title: string,
}
