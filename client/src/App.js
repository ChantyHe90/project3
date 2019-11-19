import React from "react";
import ProjectList from "./components/ProjectList";
import { Redirect, Switch, Route } from "react-router-dom";
import Quagga from "quagga";

// components
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Foods from "./components/Foods";

import "./App.css";

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
        debug: false,
        frequency: 10,
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
            // "code_128_reader",
            "ean_reader"
            // "ean_8_reader"
            // "code_39_reader"
          ]
          // debug: {
          //   drawBoundingBox: true,
          //   showFrequency: true,
          //   drawScanline: true,
          //   showPattern: true
          // }
        }
        // locator: {
        //   debug: {
        //     showCanvas: true,
        //     showPatches: true,
        //     showFoundPatches: true,
        //     showSkeleton: true,
        //     showLabels: true,
        //     showPatchLabels: true,
        //     showRemainingPatchLabels: true,
        //     boxFromPatches: {
        //       showTransformed: true,
        //       showTransformedBox: true,
        //       showBB: true
        //     }
        //   }
        // }
      },
      function(err) {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );
    Quagga.onProcessed(result => {
      console.log("processed", result);
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          console.log("result boxes", Quagga.canvas.ctx.overlay);
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              console.log("bla", box);
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
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
            render={() => <Login updateUser={this.updateUserHandler}></Login>}
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
        <div id="yourElement"></div>;
      </div>
    );
  }
}

export default App;
