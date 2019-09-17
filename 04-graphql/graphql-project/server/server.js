const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { createServer } = require('http');
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const PORT = 3600
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({
    app, path: '/graphql'
})

//Define a websockets Server that admits subscriptions.
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
 
httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} `);
});