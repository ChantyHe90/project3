import React, { Component } from "react";
import Quagga from "quagga";
import { Card, Button } from "react-bootstrap";

export class Scanner extends Component {
  componentDidMount() {
    Quagga.init(
      {
        debug: false,
        frequency: 5,
        inputStream: {
          name: "Live",
          type: "LiveStream",
          // constraints: {
          //   width: 640,
          //   height: 480
          // },
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
        },
        locator: {
          patchSize: "large"
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
    Quagga.onProcessed(result => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
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
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        // if (result.box) {
        //   Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
        //     color: "#00F",
        //     lineWidth: 2
        //   });
        // }

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
      this.props.onDetected(data.codeResult.code);
      Quagga.offProcessed();
    });
  }
  render() {
    return (
      <div>
        <Card style={{ width: "400" }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>Scanner</Card.Title>
            <Button variant="primary">
              In the future I will bring you to the ManualSearch
            </Button>
          </Card.Body>
        </Card>
        <div id="interactive" className="viewport" />;
      </div>
    );
  }
}

export default Scanner;
