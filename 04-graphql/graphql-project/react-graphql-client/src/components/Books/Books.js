import React, { Component } from "react";
import {List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    query{
        organizations{
            items{
                id
                comment
            }
            page
            pageSize
            totalCount
        }
    }
`
class Books extends Component {
  constructor (props){
    super(props);
  }

  render () {
    let { error, loading, organizations } = this.props.data; //error, loading and books will be automatically loaded by apollo provider
    console.log("Error: " + error);
    console.log("Organizations ", organizations)
    if (error) return <div>An Error Ocurred</div>
    else if (loading) return (
            <div style={styles.loaderSection}>
                <CircularProgress/>
            </div>
        )
    else return (
        <div>
            {organizations.totalCount} organizations Loaded
        </div>
    )
    return <div> Books Component </div>;
  }
}

const styles = {
    loaderSection : {
        textAlign: 'center'
    }
}

const BooksComponentWithData = graphql(getBooksQuery)(Books);
export default BooksComponentWithData;