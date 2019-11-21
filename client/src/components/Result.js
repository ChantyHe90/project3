import React, { Component } from "react";
import axios from "axios";

export class Result extends Component {
  state = {
    product: null
  };

  componentDidMount() {
    axios
      .get(`/api/products/${this.props.eanCode}`)
      .then(response => {
        this.setState({
          product: response.data
        });
      })
      .catch(() => {});
  }
  render() {
    if (this.state.product === null) {
      return <div>Loading</div>;
    }
    return (
      <div id="barcodeResult">Product:{this.state.product.generic_name_de}</div>
    );
  }
}

export default Result;
