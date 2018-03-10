// index.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserDrawer from './UserDrawer';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const httpLink = new HttpLink({uri: `http://${location.hostname}:${location.port}/api`});

const wsLink = new WebSocketLink({
    uri:`ws://${location.hostname}:${location.port}/api`,
    options: {
        reconnect: true
    }
});

const uriLink = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
);

const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        credentials: 'include'
    })
    return forward(operation)
});

const client = new ApolloClient({
    link: middlewareLink.concat(uriLink),
    cache: new InMemoryCache()
});

class App extends Component {
    componentDidMount() {
        console.log('did mount');
        client.query({ query: gql`
            {
                whoAmI {
                    id,
                    name
                }
            }`}).then(res => {
                console.log(res)
            }).catch(x => console.log(x));
    }
    render() {
        return (
            <ApolloProvider client={client}>
                <MuiThemeProvider>
                    <UserDrawer>
                    </UserDrawer>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}

const root = document.querySelector('#app');
ReactDOM.render(<App />, root);