const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const PORT = 3600
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({
    app, path: '/graphql'
})
 
app.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
});