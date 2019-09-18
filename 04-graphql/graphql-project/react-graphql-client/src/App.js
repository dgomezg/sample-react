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


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://liferay-gs-ci:8091/o/graphql'}),
  cache: new InMemoryCache()
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
