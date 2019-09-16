const { graphql, buildSchema } = require('graphql')

//build the schema
const schema = buildSchema(`
    type Query {
        greeting(name: String): String
    }
`)

//Create the resolver
const resolvers = () => {
    const greeting = args => {
        return `Hello ${args.name}`
    }
    return { greeting }
}


graphql( schema, ` { greeting(name: "Jhon") }`, resolvers() )
    .then(response => console.log(response));
    