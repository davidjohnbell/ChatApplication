import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';


export default class UserDrawer extends Component {
  componentDidMount(){
    console.log('User Drawer mounted');
  }

  render() {
    return (
      <Drawer id='userDrawer'>
      </Drawer>
    );
  }
}