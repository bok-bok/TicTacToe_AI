import React, { Component } from "react";
import classes from "./Boxes.module.css";

class Box extends Component {
  render() {
    return (
      <button className={classes.Box} onClick={this.props.clicked}>
        {this.props.value}
      </button>
    );
  }
}

export default Box;
