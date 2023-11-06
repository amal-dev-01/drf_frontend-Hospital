import React from 'react';
import './Sidebar.css'
import { Navbar, Nav, NavLink } from 'react-bootstrap';
 const Sidebar = () => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">ABC Hospital</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink href="#">Home</NavLink>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  
  export default Sidebar