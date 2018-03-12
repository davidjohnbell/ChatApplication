<template>
  <v-container grid-list-xs fluid fill-height=true style="height:calc(100vh - 64px)">
    <v-layout column>
      <v-container vue-chat-scroll grid-list-xs style="overflow-y:scroll">
        <v-layout column>
          <v-list>
            <v-list-tile
                value="true"
                v-for="(chat, i) in chats.chats"
                :key="i"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="findName(chat.user)" :class="findColor(chat.user)+'--text'"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="`<span class='text--primary'>${chat.message}</span> &mdash; ${chat.date}`"></v-list-tile-sub-title>

                </v-list-tile-content>
              </v-list-tile>
          </v-list>
        </v-layout>
      </v-container>
      <v-toolbar color="grey lighten-2" >
        <v-text-field
            light 
            v-model="chatText"
            counter="200"
            class="chat-textbox"
            maxlength="200"
            placeholder="Say something..."
            clearable
        ></v-text-field>
        <v-btn icon small @click="sendChat">
            <v-icon color="grey">send</v-icon>
        </v-btn>
      </v-toolbar>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';
export default {
  data () {
    return {
      chatText:''
    }
  },
  props:{
    chats: {},
    user:{}
  },
  methods: {
    sendChat() {
      const text = this.chatText;
      this.chatText = '';
      let nick = /\/nick [a-zA-Z0-9]+/gi.exec(text);
      let nickColor = /\/nickcolor [a-z]+/gi.exec(text);
      if(nick) {
        let nickName = nick[0].replace('/nick ', '');
        this.$apollo.mutate({
          mutation: gql`mutation {
            updateUser(id:"${this.user.id}", name:"${nickName}", color:"${this.user.color}") {
                id,
                name,
                color
            }
        }`}).then(user => {
          this.$emit('userChanged', user.data.updateUser);
          localStorage.user = JSON.stringify(user.data.updateUser);
        }).catch(err => console.log(err));
      }
      else if(nickColor){
        let color = nickColor[0].replace('/nickcolor ', '');
        this.$apollo.mutate({
          mutation: gql`mutation {
            updateUser(id:"${this.user.id}", name:"${this.user.name}", color:"${color}") {
                id,
                name,
                color
            }
        }`}).then(user => {
          this.$emit('userChanged', user.data.updateUser);
          localStorage.user = JSON.stringify(user.data.updateUser);
        });
      }
      else {
        this.$apollo.mutate({
        mutation: gql`mutation {
            createChat(id:"${this.user.id}", text:"${text}") {
                user,
                message,
                date
            }
          }`
        });
      }
    },
    findName(id) {
      let user = this.chats.users.find(u => u.id === id);
      return user.name;
    },
    findColor(id) {
      let user = this.chats.users.find(u => u.id === id);
      return user.color;
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
