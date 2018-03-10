import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';


export default class ChatList extends Component {
  componentDidMount(){
    console.log('chat list mounted');
  }

  render() {
    return (
      <List id='chatList'>
      </List>
    );
  }
}