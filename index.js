//IMPORTS
const express = require('express');
const cookieSession = require('cookie-session');
const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const room = require('./db/db');

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
    context: (req) => ({ pubsub, room})
});

server.express.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['assignment3']
}));

server.express.use('/', express.static('site'));
server.start(options, ({port}) => console.log(`Server is running on localhost:${port}`));
