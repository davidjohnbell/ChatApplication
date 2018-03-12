<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(user, i) in users"
          :key="i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="user.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title + ' chatting as ' + user.name"></v-toolbar-title>
    </v-toolbar>
    <v-content>
        <chat :chats="chats" :user="user" v-on:userChanged="userChanged">
        </chat>
    </v-content>
  </v-app>
</template>

<script>
import gql from 'graphql-tag';
export default {
    data () {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [{
                title: 'USERS'
            }],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Super Awesome Chat Application V2',
            getRoom: {},
            user:{}
        }
    },
    name: 'App',
    apollo:{
        getRoom: {
            query:gql`
                query {
                getRoom {
                    users {
                    id,
                    name,
                    color
                    }
                    chats {
                    user,
                    date,
                    message
                    }
                }
                }`,
            subscribeToMore: {
                document: gql`
                    subscription {
                        newState {
                        users {
                            id,
                            name,
                            color
                        },
                        chats {
                            user,
                            message,
                            date
                        }
                        }
                    }`,
                updateQuery: (previous, {subscriptionData}) => {
                    let result = subscriptionData.data.newState
                    return {
                        getRoom: result
                    }
                },
            }
        }
    },
    computed: {
        users() {
            return this.getRoom.users
        },
        chats() {
            return this.getRoom;
        }
    },
    methods: {
        userChanged(user) {
            this.user = user;
        }
    },
    mounted() {
        if(localStorage.user) {
            this.user = JSON.parse(localStorage.user);
        }
        else {
            this.$apollo.mutate({
                mutation: gql`mutation {
                    createUser {
                        name,
                        id,
                        color
                    }
                }`
            }).then(user => {
                localStorage.user = JSON.stringify(user.data.createUser);
                this.user = user.data.createUser;
            });
        }
        
    }
}
</script>
