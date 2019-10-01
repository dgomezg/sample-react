import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';

import 'dotenv/config';


const BACKEND_URL = 'http://localhost:8091'

const client = new ApolloClient({
  uri: BACKEND_URL+'/o/graphql', 
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `${process.env.LIFERAY_AUTHORIZATION_TOKEN}`,
      },
    });
  },
});

// const client = new ApolloClient({
//   uri: 'https://api.github.com/graphql',
//   request: operation => {
//     operation.setContext({
//       headers: {
//         authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
//       },
//     });
//   },
// });

const GET_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

const getDestinationsQuery = gql`
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
`;



client
  .query({
    query: getDestinationsQuery,
  })
  // .then(response => console.log(response.data.destinations.items))
  .then(response => {
    var render = response.data.destinations.items.map(destination => destination.title
    );
    console.log(render);
  })
  .catch(error => console.log(error));

