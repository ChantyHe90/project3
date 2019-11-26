import React from "react";
import axios from "axios";

class AddProject extends React.Component {
  state = {
    title: "",
    description: ""
  };

  submitHandler = event => {
    event.preventDefault();
    // send the data to the backend
    axios
      .post("/api/projects", this.state)
      .then(response => {
        this.setState({
          title: "",
          description: ""
        });

        this.props.addProject();
        // const newlyCreatedProject = response.data
        // this.props.addProject(newlyCreatedProject) // { title, description, _id }
      })
      .catch(() => {});
  };

  changeTitleHandler = event => {
    this.setState({
      title: event.target.value
    });
  };

  changeDescHandler = event => {
    this.setState({
      description: event.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Add a new Project: </h1>
        <form onSubmit={this.submitHandler}>
          <input
            onChange={this.changeTitleHandler}
            value={this.state.title}
            type="text"
            placeholder="title"
          ></input>
          <br></br>
          <input
            onChange={this.changeDescHandler}
            value={this.state.description}
            type="text"
            placeholder="description"
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddProject;
