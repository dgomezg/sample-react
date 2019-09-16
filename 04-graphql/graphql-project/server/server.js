const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const authors = [
    {
        id: "1",
        info: {
            name: "Joe Kelly",
            age: 32,
            gender: "M"
        }
    },
    {
        id: "2",
        info: {
            name: "Mary Jane",
            age: 27,
            gender: "F"
        }
    }
]

const typeDefs = `
    type Author {
        id: ID!
        info: Person
    }
    type Person {
        name: String!
        age: Int!
        gender: String
    }
    type Query {
        getAuthors: [Author]
        getAuthor(id: ID!): Author
    }
    type Mutation{
        createAuthor(name: String!, gender: String!): Author
    }
`

const resolvers = {
    Query: {
        getAuthors: () => authors,
        getAuthor: (obj, { id } ) => authors.find(author => author.id === id) 
    },
    Mutation: {
        createAuthor: (obj, args) => {
            const id = String(authors.length + 1);
            const newAuthor = {
                id: id,
                info: {
                    name: args.name,
                    gender: args.gender
                }
            }
            authors.push( newAuthor );
            return newAuthor;
        }
    }
}

const PORT = 3600
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({
    app, path: '/graphql'
})
 
app.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
});