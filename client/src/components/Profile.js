import React, { Component } from "react";
import axios from "axios";
import ManualSearch from "./ManualSearch";
// foods from /api/food
export class Profile extends Component {
  render() {
    return (
      <div>
        <ManualSearch />
      </div>
    );
  }
}

export default Profile;
