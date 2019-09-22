import React, {Component} from 'react';
import Travel from './Travel/Travel';

import { graphql } from 'react-apollo';

import gql from 'graphql-tag';

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

class TravelSelector extends Component {

    render() {
        let {error, loading, destinations} = this.props.data;
        if (error){
            console.log("Error: " + error.message);
            return <div>An error ocurred while retrieving destinations {error.message}</div>
        } else if (loading) {
            console.log("Loading data");
            return (
                <div>Loading data...</div>
            )
        } else {
            console.log("destinations: ", this.props.data)
            return (
                <div>
                    <h2>Choose your Travel</h2>
                    <p> {destinations.totalCount} available destinations</p>
                    <div className="Travels">
                        {destinations.items.map(destination => (
                            <Travel 
                                key={destination.id}
                                title={destination.title}
                                details={destination.content.details}
                            />
                        ))}
                    </div>
                </div>
         );
        }
    }
} 

const TravelSelectorWithData = graphql(getDestinationsQuery, {

})(TravelSelector)

export default TravelSelectorWithData;