const { GraphQLClient } = require('graphql-request');

//const GRAPHQL_ENDPOINT = 'https://avoco.serveo.net';
const GRAPHQL_ENDPOINT = 'http://localhost:8091';

const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT+'/o/graphql', {
    headers: {
        authorization: 'Basic dGVzdDp0ZXN0'
    }
});

const getDestinationsQuery = `
 {
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
`;

async function getDestinations() {
    const response = await graphQLClient.request(getDestinationsQuery);
    const dests = response.destinations.items.map(destination => destination.title)
    console.log(dests.join(' or '));
    return response
}

getDestinations();
console.log('Hello world');