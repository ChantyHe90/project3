import React from "react";
import ProjectList from "./components/ProjectList";
import { Redirect, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Foods from "./components/FoodList";
import Scanner from "./components/Scanner";
import Result from "./components/Result";
import "./App.css";
import Quagga from "quagga";
import ManualSearch from "./components/ManualSearch";
import Profile from "./components/Profile";

function findMostCommonValue(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
    return maxEl;
  }
}

class App extends React.Component {
  state = {
    loggedInUser: this.props.user,
    detected: false,
    scanning: false,
    results: []
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

  scanHandler = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  detectedHandler = result => {
    if (this.state.results.length < 5) {
      this.setState({
        results: this.state.results.concat([result])
      });
    } else {
      this.setState({
        scanning: !this.state.scanning,
        detected: !this.state.detected,
        results: findMostCommonValue(this.state.results)
      });
      console.log(this.state.results);
      Quagga.offDetected();
    }
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
        <button onClick={this.scanHandler}>
          {this.state.scanning ? "Stop" : "Start"}
        </button>
        {this.state.scanning ? (
          <Scanner onDetected={this.detectedHandler} />
        ) : null}
        {this.state.detected ? <Result eanCode={this.state.results} /> : null}
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
