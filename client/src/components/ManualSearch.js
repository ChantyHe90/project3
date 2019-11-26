import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
// here manual search will be shown
import UserAddsFood from "./UserAddsFood";
class ManualSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: [],
      foods: []
    };
  }
  getFoodBySearch = () => {
    axios
      .get("/api/foods?searchTerm=" + this.state.searchTerm)
      .then(response => {
        // use console.log !
        console.log("response.data : " + JSON.stringify(response.data));
        this.setState({ foods: response.data }); // this triggers a re-render
      });
  };

  handleFormSubmit = e => {
    // Prevent button click from submitting form
    e.preventDefault();
    this.getFoodBySearch();
  };
  changeHandler = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    return (
      <div className="content">
        <h1>
          result:
          {this.state.foods.map(food => (
            <p>{food.name}</p>
          ))}
        </h1>
        <div className="input-group-prepend justify-content-center">
          {/* display our foodlist */}
          {/* <section className="section">
            <ul>
              {this.state.foodList.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section> */}
          <Form onSubmit={this.handleFormSubmit}>
            <input
              className="input"
              type="text"
              name="searchTerm"
              placeholder="search"
              onChange={this.changeHandler}
            />
            <Button
              className="submit"
              aria-hidden="true"
              type="text"
              name="searchTerm"
            >
              search
            </Button>
          </Form>
          <UserAddsFood
            searchTerm={this.state.searchTerm}
            addFood={this.getFoodBySearch}
          />
        </div>
      </div>
    );
  }
}
export default ManualSearch;
