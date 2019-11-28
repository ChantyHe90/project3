import React, { Component } from "react";
import axios from "axios";
import ManualSearch from "./ManualSearch";
// foods from /api/food
export class Profile extends Component {
  render() {
    return (
      <div>
        {this.props.user.addedFooditems.map(item => (
          <h1>{item}</h1>
        ))}
        <ManualSearch addFood={this.props.addFood} />
      </div>
    );
  }
}

export default Profile;
