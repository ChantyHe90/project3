import React from "react";
import axios from "axios";

class UserAddsFood extends React.Component {
  submitHandler = e => {
    e.preventDefault();
    const data = {
      product_name: this.props.searchTerm
    };
    console.log("Here is the added:", data.product_name);
    axios
      .post("/api/foods", data)
      .then(response => {
        // this.setState({
        //   name: ""
        // });
        const addedFooditems = response.data;
        this.props.addFood(addedFooditems);
      })
      .catch(() => {});
  };
  //   changeNameHandler = event => {
  //     this.setState({
  //       name: event.target.value
  //     });
  //   };

  render() {
    return (
      <div>
        <button onClick={this.submitHandler} type="submit">
          add to profile
        </button>
      </div>
    );
  }
}
export default UserAddsFood;
