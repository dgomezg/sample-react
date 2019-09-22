import React, {Component} from 'react';
import Travel from './Travel/Travel';
import ErrorPanel from '../UI/ErrorPanel/ErrorPanel';
import Spinner from '../UI/Spinner/Spinner'

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
        if (error)
            return <ErrorPanel error={error}/>
         else if (loading) 
            return <Spinner/>
         else {
          console.log("destinations: ", this.props.data);
          return (
                <div>
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