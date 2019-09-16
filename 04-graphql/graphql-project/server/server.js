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
    type DeleteMessage {
        id: ID!
        message: String 
    }
    type Query {
        getAuthors: [Author]
        getAuthor(id: ID!): Author
    }
    type Mutation{
        createAuthor(name: String!, gender: String!): Author
        updateAuthor(id: ID!, name: String, gender: String, age: Int):Author
        deleteAuthor(id:ID!): DeleteMessage
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
        },
        updateAuthor: (obj, {id, name, gender, age}) => {
            const author = authors.find(author => author.id === id);
            if (author) {
                const authorIndex = authors.indexOf(author);
                if (name) author.info.name = name;
                if (gender) author.info.gender = gender;
                if (age) author.info.age = age;

                authors[authorIndex] = {id, info: author.info}
                return authors[authorIndex];
            } else {
                throw new Error ("Author ID not found");
            }
        },
        deleteAuthor: (obj, {id}) => {
            const author = authors.find(author => author.id === id) 
            if (author) {
                const authorIndex = authors.indexOf(author);
                authors.splice(authorIndex, 1);
                return {
                    id: id,
                    message: `author $id removed sucessfully`
                }
            } else {
                return {
                    id: id,
                    message: `author $id could not be deleted because was not found`
                }
            }
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