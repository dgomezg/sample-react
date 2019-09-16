const { graphql, buildSchema } = require('graphql')

//Define the Schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);

const resolvers = () => {
    const message = () => {
        return 'Hello World'
    }    
    return { message }
}

//execute the query
graphql(schema, '{ message }', resolvers())
    .then(response => console.log(response) );


