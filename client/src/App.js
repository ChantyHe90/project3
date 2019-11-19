import React from "react";
import ProjectList from "./components/ProjectList";
import Signup from "./components/Signup";
import { Redirect, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Quagga from "quagga";

class App extends React.Component {
  state = {
    loggedInUser: this.props.user,
    detected: []
  };

  updateUserHandler = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  componentDidMount() {
    Quagga.init(
      {
        frequency: 5,
        inputStream: {
          name: "Live",
          type: "LiveStream",
          area: {
            // defines rectangle of the detection/localization area
            top: "20%", // top offset
            right: "20%", // right offset
            left: "20%", // left offset
            bottom: "20%" // bottom offset
          },
          target: document.querySelector("#yourElement") // Or '#yourElement' (optional),
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader"
          ],
          debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true
          }
        }
      },
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );
    Quagga.onProcessed(data => {
      console.log("processed", data);
    });
    Quagga.onDetected(data => {
      console.log("detected", data);
      console.log(data.codeResult);
      Quagga.offProcessed();
    });
  }

  render() {
    return (
      <div>
        Hello,{" "}
        {this.state.loggedInUser
          ? this.state.loggedInUser.username
          : "Stranger"}{" "}
        !
        <Navbar updateUser={this.updateUserHandler} />
        <Switch>
          {/* <Route path="/profile" component={ProjectList}></Route> */}
          <Route
            path="/login"
            render={() => <Login updateUser={this.updateUserHandler}></Login>}
          ></Route>
          <Route
            path="/profile"
            render={() => <ProjectList></ProjectList>}
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
        </Switch>
        <div id="yourElement"></div>;
      </div>
    );
  }
}

export default App;
