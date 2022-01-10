import React from 'react'
import {  Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from 'react-router-dom'
import "./Header.css"

function Header() {
    return (
       <Navbar bg="secondary" expand="lg" variant="dark">
  <Container>
    <Navbar.Brand > <Link className="repairLink" to="/">Note Book</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
        <nav className='m-auto'>
             <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
      </Form>
        </nav>
      <Nav
        className="my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link> <Link className='repairLink' to="/mynotes">My Notes</Link></Nav.Link>
        <NavDropdown title="Gaamy" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">My profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
     
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default Header
