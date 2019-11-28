import React from "react";
import axios from "axios";

class AddProject extends React.Component {
  state = {
    product_name: "",
    code: "",
    foodfromlists: ""
  };

  submitHandler = event => {
    event.preventDefault();
    // send the data to the backend
    axios
      .post("/api/projects", this.state)
      .then(response => {
        this.setState({
          product_name: "",
          code: "",
          foodfromlists: ""
        });

        this.props.addProject();
        // const newlyCreatedProject = response.data
        // this.props.addProject(newlyCreatedProject) // { title, description, _id }
      })
      .catch(() => {});
  };

  changeNameHandler = event => {
    this.setState({
      product_name: event.target.value
    });
  };

  changeCodeHandler = event => {
    this.setState({
      code: event.target.value
    });
  };

  changeCategoryHandler = event => {
    this.setState({
      foodfromlists: event.target.value
    });
  };

  render() {
    return (
      <div>
        <h3>Add a new Product: </h3>
        <form onSubmit={this.submitHandler}>
          <input
            onChange={this.changeNameHandler}
            value={this.state.product_name}
            type="text"
            placeholder="Product"
          ></input>
          <br></br>
          <input
            onChange={this.changeCodeHandler}
            value={this.state.code}
            type="text"
            placeholder="EAN Code"
          ></input>
          <br></br>
          <input
            onChange={this.changeCategoryHandler}
            value={this.state.foodfromlists}
            type="text"
            placeholder="Category"
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddProject;
