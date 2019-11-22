import React from "react";
import ProjectList from "./components/ProjectList";
import { Redirect, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Foods from "./components/Foods";
import Scanner from "./components/Scanner";
import Result from "./components/Result";
import "./App.css";
import Quagga from "quagga";

class App extends React.Component {
  state = {
    loggedInUser: this.props.user,
    detected: false,
    scanning: false,
    results: []
  };

  updateUserHandler = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  scanHandler = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  detectedHandler = result => {
    this.setState({
      results: this.state.results.concat([result]),
      scanning: !this.state.scanning,
      detected: !this.state.detected
    });
    console.log(this.state.results);
    Quagga.offDetected();
  };

  render() {
    return (
      <div>
        <MyFilteringComponent></MyFilteringComponent>
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
        {this.state.detected ? (
          <Result eanCode={this.state.results[0]} />
        ) : null}
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
                return <ProjectList></ProjectList>;
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
