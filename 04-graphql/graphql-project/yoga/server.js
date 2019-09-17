const { GraphQLServer, PubSub } = require('graphql-yoga');
var records = [];

const typeDefs = `
    type Query {
        fetchRecords: [String]
    }
    type Mutation {
        createRecord(recordData: String!): String!
        updateRecord(recordIndex: Int!, recordName: String!): String!
    }
    type Subscription {
        newRecord: String
    }
`;

const RECORD_CHANEL = "RECORDS";

const resolvers = {
    Query: {
        fetchRecords: () => records
    },

    Mutation: {
        createRecord: (obj, {recordData}) => {
            records.push(recordData);
            pubsub.publish(RECORD_CHANEL, { newRecord: recordData});
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
    }, 

    Subscription: {
        newRecord: {
            subscribe: (parent, args, { pubsub }) => {
                return pubsub.asyncIterator(RECORD_CHANEL);
            }
        }
    }
}

const pubsub = new PubSub();

const server = new GraphQLServer({typeDefs, resolvers, context: { pubsub }});

server.start( () => {
    console.log('Server started in localhost:4000');
})