import React from 'react';
import './Business/Business.css';
import '../App.css';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

class MenuBar extends React.Component {
    render() {
        return(
      <div className="App">
        {/* <Navbar type="light" theme="primary" expand="md">
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                <h5>General Search</h5>
              </NavLink>
        
            </NavItem>
            <NavItem>
            <NavLink active href="/App2">
                <h5>Fun Search </h5>
              </NavLink>
            </NavItem>
          </Nav>
      </Navbar> */}
      <div>
          <h1>
          <Navbar type="light" theme="primary" expand="md">
          <h5>
          <NavbarBrand href="/">General Search</NavbarBrand>&nbsp;&nbsp;
          <NavLink active href="/App2">Fun Search</NavLink>
          </h5>
          </Navbar>
          </h1>
        </div >
      </div>
        )
    }
}

export default MenuBar