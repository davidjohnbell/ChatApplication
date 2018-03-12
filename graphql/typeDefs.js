module.exports = `

type Query {
    whoAmI: User!,
    getRoom: Room!
}

type Mutation {
    createUser: User!,
    updateUser(id:ID!, name:String!, color:String!): User!,
    createChat(id:ID!, text:String!): Chat!
}

type Subscription {
    newState: Room!
}

type Room {
    users: [User!]!,
    chats: [Chat!]!,
}

type User {
    id: ID!,
    name: String!,
    color: String!
}

type Chat {
    user: ID!,
    message: String!,
    date: String!
}
`