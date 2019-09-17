const authors = require('./author');
const {PubSub} = require('apollo-server-express');
const pubsub = new PubSub();

const AUTHORS_TOPIC = "newAuthor";

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
            pubsub.publish(AUTHORS_TOPIC, { createAuthorWithSubscription: newAuthor });
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
                    message: `author ${id} removed sucessfully`
                }
            } else {
                return {
                    id: id,
                    message: `author ${id} could not be deleted because was not found`
                }
            }
        }
    },

    Subscription: {
        createAuthorWithSubscription: {
            subscribe: () => pubsub.asyncIterator(AUTHORS_TOPIC)
        }
    }
}

module.exports = resolvers;