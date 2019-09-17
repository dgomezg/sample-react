const { GraphQLServer } = require('graphql-yoga');
var records = [];

const typeDefs = `
    type Query {
        fetchRecords: [String]
    }
    type Mutation {
        createRecord(recordData: String!): String!
        updateRecord(recordIndex: Int!, recordName: String!): String!
    }
`;

const resolvers = {
    Query: {
        fetchRecords: () => records
    },

    Mutation: {
        createRecord: (obj, {recordData}) => {
            records.push(recordData);
            return recordData;
        },
        updateRecord: (obj, {recordIndex, recordName}) => {
            if (recordIndex <= records.length) {
                records[recordIndex] = recordName;
                return recordName;
            } else {
                throw new Error('Record index does not exist');
            }
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});

server.start( () => {
    console.log('Server started in localhost:4000');
})