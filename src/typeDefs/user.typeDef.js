const userTypeDef = `#graphql
type User{
    _id: ID!
    name: String!
    email: String!
    password: String!
    gender: String!
    transections: [Transection!]
    profilePic: String
    createdAt: String!
    updatedAt: String!

}

type Query{
    getUsers: [User!]!
    currentUser: User!
    userById(_id: ID!): User!

}

type Mutation{
    signUp(input: SignUpInput!): User!
    signIn(input: SignInInput!): User!
    logOut: LogoutMessage!
}

input SignUpInput{
    name: String!
    email: String!
    password: String!
    gender: String!
}

input SignInInput{
    email: String!
    password: String!
}

type LogoutMessage{
    message: String!
}
`

export { userTypeDef}