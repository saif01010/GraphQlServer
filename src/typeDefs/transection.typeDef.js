const transectionTypeDef = `#graphql 
type Transection{
    _id: ID!
    userId: ID!
    amount: Float!
    paymentType: String!
    category: String!
    description: String
    user: User!
    date: String!
    location: String!
    createdAt: String!
    updatedAt: String!
}

type Query{
    getAllTransections: [Transection!]!
    transectionById(_id: ID!): Transection!
    catagagroryStats: [CatagoryStat!]!
}

type Mutation{
    addTransection(input: AddTransectionInput!): Transection!
    updateTransection(_id: ID!, input: UpdateTransectionInput!): Transection!
    deleteTransection(_id: ID!): Transection!
}
type CatagoryStat{
    _id: ID!
    category: String!
    total: Float!
}

input AddTransectionInput{
    amount: Float!
    paymentType: String!
    category: String!
    description: String 
    date: String!
    location: String
}

input UpdateTransectionInput{
    _id: ID!
    amount: Float
    paymentType: String
    category: String
    description: String
    date: String
    location: String
}


`

export { transectionTypeDef }