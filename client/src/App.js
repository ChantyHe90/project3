import React from "react";
import ProjectList from "./components/ProjectList";
import { Redirect, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Foods from "./components/FoodList";
import "./App.css";
import ManualSearch from "./components/ManualSearch";
import Profile from "./components/Profile";
import ScanningFrame from "./components/ScanningFrame";

class App extends React.Component {
  state = {
    loggedInUser: this.props.user
  };

  updateUserHandler = userObj => {
    // console.log("updating user");
    // console.log(userObj);
    this.setState({
      loggedInUser: userObj
    });
  };

  addFoodHandler = array => {
    let copy = { ...this.state.loggedInUser };
    console.log("array");
    console.log(array);
    copy.addedFooditems = array;
    console.log("copy");
    console.log(copy);
    this.setState({
      loggedInUser: copy
    });
  };

  render() {
    return (
      <div>
        {/* <MyFilteringComponent></MyFilteringComponent> */}
        Hello,
        {this.state.loggedInUser
          ? this.state.loggedInUser.username
          : "Stranger"}
        !
        <Navbar updateUser={this.updateUserHandler} />
        <Switch>
          {/* <Route path="/profile" component={ProjectList}></Route> */}

          <Route
            path="/login"
            render={() => {
              if (this.state.loggedInUser) {
                return <Redirect to="/profile"></Redirect>;
              } else {
                return <Login updateUser={this.updateUserHandler}></Login>;
              }
            }}
          ></Route>
          <Route
            path="/scan"
            render={() => {
              return <ScanningFrame></ScanningFrame>;
            }}
          ></Route>
          <Route
            path="/profile"
            render={() => {
              if (this.state.loggedInUser) {
                return (
                  <Profile
                    user={this.state.loggedInUser}
                    addFood={this.addFoodHandler}
                  ></Profile>
                );
              } else {
                return <Redirect to="/"></Redirect>;
              }
            }}
          ></Route>

          <Route
            path="/signup"
            render={() => {
              if (this.state.loggedInUser) {
                return <Redirect to="/profile"></Redirect>;
              } else {
                return (
                  <div>
                    <Signup
                      history={this.props.history}
                      updateUser={this.updateUserHandler}
                    ></Signup>
                  </div>
                );
              }
            }}
          ></Route>

          <Route path="/foodsExtended" render={() => <Foods></Foods>}></Route>
        </Switch>
      </div>
    );
  }
}
export default App;
