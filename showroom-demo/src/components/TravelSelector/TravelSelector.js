import React, {Component} from 'react';
import Travel from './Travel/Travel';

import { graphql } from 'react-apollo';

import gql from 'graphql-tag';

const getDestinationsQuery = gql`
    query {
        contentSetContentSetElements(contentSetId: 35128) {
            items {
                id
                title     
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
        } else if (loading) 
            return (
                <div>Loading data...</div>
            )
        else return (
            <div>
                <h2>Choose your Travel</h2>
                <p> {destinations.totalCount} destinations Available</p>
                <div className="Travels">
                    <Travel title="Amsterdam"/>
                    <Travel title="Egipt"/>
                    <Travel title="Caribean"/>
                </div>
            </div>
        );
    }
} 

const TravelSelectorWithData = graphql(getDestinationsQuery)(TravelSelector)

export default TravelSelectorWithData;