const { graphql, buildSchema } = require('graphql')


//create a memorydb
const db = {
    cars : [
        {
            id: 'a',
            brand: 'Ford',
            color: 'Blue',
            doors: 4, 
            type: 'Sedan'
        },
        {
            id: 'b',
            brand: 'Tesla',
            color: 'Red',
            doors: 4, 
            type: 'SUV'
        },
        {
            id: 'c',
            brand: 'Toyota',
            color: 'White',
            doors: 4, 
            type: 'Coupe'
        },
        {
            id: 'd',
            brand: 'Toyota',
            color: 'Red',
            doors: 4, 
            type: 'Coupe'
        }
    ]
}

//Define the schema
const schema = buildSchema(`
    enum CarTypes {
        Sedan
        SUV
        Coupe
    }
    type Car {
        id: ID!
        brand: String!
        color: String!
        doors: Int!
        type: CarTypes!
    }
    type Query {
        carsByType(type:CarTypes!): [Car]
        carsById(id:ID!): Car
    }
    type Mutation {
        insertCar(brand: String!, color: String!, doors: Int!, type: CarTypes!): [Car]
    }
`)

//Create the resolvers
const resolvers = () => {
    const carsByType = args => {
        return db.cars.filter(car => car.type === args.type)
    }
    const carsById = args => {
        console.log("CarsById")
        return db.cars.filter(car => car.id === args.id)[0]
    }
    const insertCar = ({ brand, color, doors, type }) => {
        console.log("insertCar")
        db.cars.push({
            id: Math.random().toString(),
            brand: brand,
            color: color,
            doors: doors, 
            type: type
        });
        console.log(db.cars);
        return db.cars
    }
    return {carsByType, carsById, insertCar}
}

//execute the Queries:
// const CoupeCars = `
//     {
//         carsByType(type:Coupe){
//             brand
//             color
//             type
//             id
//         }
//     }
// `
// graphql(schema, CoupeCars, resolvers())
//     .then(response => console.log(response.data));

// const carA = `
// {
//     carsById(id:"a"){
//         brand
//         type
//         color
//         id
//     }
// }
// `

// graphql(schema, carA, resolvers())
//     .then(response => console.log(response.data));

//Insert a new car using mutaiton operation
const mutation = `
mutation {
    insertCar(brand: "Mitsubitshi", color: "gray", doors: 5, type: SUV){
        brand
        color
        id
    }
}
` 
 
graphql(schema, mutation, resolvers)
    .then(response => console.log(response));

