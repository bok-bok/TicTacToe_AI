import React, { Component } from "react";
import classes from "./Boxes.module.css";
import Box from "./Box";
class Boxes extends Component {
  render() {
    const next = this.props.next ? "X" : "O";
    return (
      <div>
        <div style={{ display: "inline-block" }}>
          <div className={classes.Row}>
            <Box
              value={this.props.boxes[0]}
              clicked={() => this.props.clicked(0, next)}
            />
            <Box
              value={this.props.boxes[1]}
              clicked={() => this.props.clicked(1, next)}
            />
            <Box
              value={this.props.boxes[2]}
              clicked={() => this.props.clicked(2, next)}
            />
          </div>
          <div className={classes.Row}>
            <Box
              value={this.props.boxes[3]}
              clicked={() => this.props.clicked(3, next)}
            />
            <Box
              value={this.props.boxes[4]}
              clicked={() => this.props.clicked(4, next)}
            />
            <Box
              value={this.props.boxes[5]}
              clicked={() => this.props.clicked(5, next)}
            />
          </div>
          <div className={classes.Row}>
            <Box
              value={this.props.boxes[6]}
              clicked={() => this.props.clicked(6, next)}
            />
            <Box
              value={this.props.boxes[7]}
              clicked={() => this.props.clicked(7, next)}
            />
            <Box
              value={this.props.boxes[8]}
              clicked={() => this.props.clicked(8, next)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Boxes;
