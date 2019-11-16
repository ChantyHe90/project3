import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    errorMessage: null
  };

  submitHandler = event => {
    event.preventDefault();
    axios
      .post("/api/auth/login", this.state)
      .then(response => {
        console.log("response is done: ", response);
        this.props.updateUser(response.data);
      })
      .catch(error => {
        // error.response;
        console.log("something is wrong with Login", error.response.data);
        this.setState({
          errorMessage: error.response.data.message
        });
      });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        LOGIN:
        <form onSubmit={this.submitHandler}>
          <input
            name="username"
            onChange={this.changeHandler}
            value={this.state.username}
            type="text"
            placeholder="username"
          ></input>
          <br></br>
          <input
            name="password"
            onChange={this.changeHandler}
            value={this.state.password}
            type="text"
            placeholder="password"
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
