import React, { Component } from "react";
import Board from "./container/Board/Board";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>TIC-TAC-TEO</h1>
        <Board />
      </div>
    );
  }
}

export default App;
