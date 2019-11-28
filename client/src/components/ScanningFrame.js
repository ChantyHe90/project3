import React, { Component } from "react";
import Quagga from "quagga";
import { Card, Button } from "react-bootstrap";
import Scanner from "./Scanner";
import "../App.css";
import Result from "./Result";
import AddProject from "./AddProject";

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

export class ScanningFrame extends Component {
  state = {
    detected: false,
    scanning: false,
    results: [],
    scannedOnce: false
  };

  scanHandler = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  restartHandler = () => {
    this.setState({
      scanning: !this.state.scanning,
      results: [],
      detected: !this.state.detected
    });
  };

  detectedHandler = result => {
    if (this.state.results.length < 10 && result.length === 13) {
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
    if (this.state.scanning) {
      return <Scanner onDetected={this.detectedHandler} />;
    } else if (this.state.detected) {
      return (
        <div>
          <Result eanCode={this.state.results} />
          <button onClick={this.restartHandler}>Restart</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.scanHandler}>Start</button>;
          <AddProject></AddProject>
        </div>
      );
    }
  }
}

export default ScanningFrame;
