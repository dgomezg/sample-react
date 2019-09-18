import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from "material-ui/AppBar";
//import Books from './components/Books/Books';
import BooksComponentWithData from './components/Books/Books';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import './App.css';

import { setContext } from 'apollo-link-context';

const authLink = setContext((_, { headers }) => {
    return  {
        headers: Object.assign({}, headers, { Authorization: 'Basic dGVzdDp0ZXN0'})
    }
});

const defaultOptions = {
  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  }
};


const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: 'http://liferay-gs-ci:8091/o/graphql'})),
  cache: new InMemoryCache(), 
  defaultOptions
});

function App() {
  return (
    <div className="App">
        <MuiThemeProvider>
          <ApolloProvider client={client}>
            <AppBar title="GraphQL React" />
            <BooksComponentWithData/>
          </ApolloProvider>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
