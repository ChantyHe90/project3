import React, { Component } from "react";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default class myNavbar extends Component {
  LogoutHandler = () => {
    axios
      .get("/api/auth/logout")
      .then(res => {
        console.log(res, "res");
        this.props.updateUser(null);
        res.render("/");
      })
      .catch(err => {
        console.log("something went wrong with Logout", err);
      });
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
          <Button variant="outline-info" onClick={this.LogoutHandler}>
            Logout
          </Button>
          <Link to="/login">
            <Button variant="outline-info">Login</Button>
          </Link>
          <Link to="/scan">
            <Button variant="outline-info">scan</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline-info">Signup</Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline-info">Profile</Button>
          </Link>
        </Navbar>
      </div>
    );
  }
}
