// index.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {SideNav, SideNavItem, Navbar, Dropdown, Button} from 'react-materialize';


class App extends Component {
  render() {
    return (
        <div>
            
            <SideNav>
                <SideNavItem subheader>sub header</SideNavItem>
            </SideNav>
        </div>
    );
  }
}

const root = document.querySelector('#app');
ReactDOM.render(<App />, root);