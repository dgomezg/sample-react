import React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';


import TravelSelector from './components/TravelSelector/TravelSelector';


import './App.css';

const apolloClient = new ApolloClient({
  link: new HttpLink({uri: 'http://liferay-gs:8091/o/graphql'}), 
  cache: new InMemoryCache()
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Header-banner</div>
        <ApolloProvider client={apolloClient}>
          <TravelSelector/>
          <div>Travel detail</div>
        </ApolloProvider>
      </header>
    </div>
  );
}

export default App;
