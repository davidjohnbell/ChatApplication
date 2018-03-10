import React, {Component} from 'react';
import Paper from 'material-ui/Paper';


export default class ChatPaper extends Component {
  componentDidMount(){
    console.log('chat list mounted');
  }

  render() {
    return (
      <Paper id='chatPaper'>
      </Paper>
    );
  }
}