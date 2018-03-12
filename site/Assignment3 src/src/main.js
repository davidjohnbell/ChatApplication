// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import VueApollo from 'vue-apollo'
import VueChatScroll from 'vue-chat-scroll'

import Chat from './components/Chat'
const httpLink = new HttpLink({
    uri: 'http://localhost:1337/api'
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:1337/api',
    options: {
        reconnect: true
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
);

const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

Vue.use(Vuetify)
Vue.use(VueApollo);
Vue.use(VueChatScroll);

const apolloProvider = new VueApollo( {
  defaultClient: apolloClient
})
Vue.config.productionTip = false
Vue.component('chat', Chat);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  provide: apolloProvider.provide(),
  template: '<App/>'
})
