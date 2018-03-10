//IMPORTS
const express = require('express');
const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

//SERVER
const pubsub = new PubSub();
const options = {
    port: process.env.PORT || 1337,
    endpoint: '/api',
    subscriptions: '/api',
    playground: '/playground'
};

const server = new GraphQLServer({ 
    typeDefs,
    resolvers,
    context: (req) => ({ pubsub})
});

server.express.use('/', express.static('site'));
server.start(options, ({port}) => console.log(`Server is running on localhost:${port}`));
