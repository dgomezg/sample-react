var { ApolloClient, InMemoryCache } = require('apollo-boost');
var { HttpLink } = require('apollo-link-http');
var gql = require('graphql-tag');
var setContext = require('apollo-link-context');

console.log(setContext);
const authLink = setContext((_, { headers }) => {
    return {
      headers: Object.assign({}, headers, { Authorization: 'Basic dGVzdDp0ZXN0' })
    }
  })
  
const client = new ApolloClient({
    link: authLink.concat(new HttpLink( {uri: 'http://localhost:8091/o/graphql'})),
    cache: new InMemoryCache()
});

client.query({
    query: gql`
query {
  destinations: contentSetContentSetElements(contentSetId: 35128) {
    items {
        id
        title
        content {
          ... on StructuredContent {
            details: contentFields {
              type: dataType
              name
              label
              value {
                data
                geo {
                  latitude
                  longitude
                }
                image {
                  ... on ContentDocument {
                    contentUrl
                    encodingFormat
                  }
                }

              }
            }
          }
        }
    }
    page
    pageSize
    totalCount
  }
}
`
})
.then(data => console.log(data))
.catch(error => console.error(error));
