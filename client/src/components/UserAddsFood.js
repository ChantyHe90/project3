import React from "react";
import axios from "axios";

class UserAddsFood extends React.Component {
  submitHandler = e => {
    e.preventDefault();
    const data = {
      name: this.props.searchTerm
    };
    console.log(data);
    axios
      .post("/api/foods", data)
      .then(response => {
        // this.setState({
        //   name: ""
        // });
        this.props.addFood();
        const newCreated = response.data;
        this.props.addFood(newCreated);
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
