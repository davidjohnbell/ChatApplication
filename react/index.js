// index.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserDrawer from './UserDrawer';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({ uri: location + '/api' }),
  cache: new InMemoryCache()
});


class App extends Component {
    componentDidMount() {
        console.log(location);
        client.query({ query: gql`
            { 
                whoAmI {
                    id,
                    name
                }
            }`}).then(res => console.log(res));
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