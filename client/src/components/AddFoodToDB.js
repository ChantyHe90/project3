import React, { Component } from "react";

class AddFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: ""
    };
  }

  handleFormSubmit = e => {
    // Prevent button click from submitting form
    e.preventDefault();
    this.props.addTheFood(this.state);
    this.setState({
      name: "",
      image: ""
    });
  };
  changeHandler = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>name</label>
          <input
            className="input"
            type="text"
            name="name"
            value={this.state.name}
            onChange={e => this.changeHandler(e)}
          />
        </form>

        <button className="button is-info" type="submit" value="Submit" />
      </div>
    );
  }
}

export default AddFood;
