module.exports = `

type Query {
    whoAmI: User!,
    getRoom: Room!
}

type Mutation {
    createUser: User!,
    updateUser(id:ID!): User!,
    createChat: Chat!
}

type Subscription {
    newChat: Chat!,
    newUser: User!
}

type Room {
    users: [User!]!,
    chats: [Chat!]!,
}

type User {
    id: ID!,
    color: String!
}

type Chat {
    user: ID!,
    message: String!,
    date: String!
}
`