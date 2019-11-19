import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  LogoutHandler = () => {
    axios
      .post("/api/auth/logout")
      .then(res => {
        console.log(res, "res");
        this.props.updateUser(null);
      })
      .catch(err => {
        console.log("something went wrong with Logout", err);
      });
  };
  render() {
    return (
      <div>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign Up</Link>
        <button onClick={this.LogoutHandler}>Logout</button>
      </div>
    );
  }
}
