import React, { Component } from "react";
import Boxes from "./Boxes";

class Board extends Component {
  state = {
    board: Array(9).fill(null),
    isX: true
  };

  boxClickedHandler = (idx, rock) => {
    const newBoard = [...this.state.board];
    if (newBoard[idx] !== null || this.checkWinner(this.state.board)) {
      return;
    }
    newBoard[idx] = rock;

    this.setState({ board: newBoard, isX: !this.state.isX });
  };

  newGameHandler = () => {
    this.setState({ board: Array(9).fill(null), isX: true });
  };

  checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  render() {
    let nextPlayer = this.state.isX ? <h3>X player</h3> : <h3>O player</h3>;
    const winner = this.checkWinner(this.state.board);

    if (winner !== null) {
      nextPlayer = <h3>Winner is {winner}</h3>;
    }
    return (
      <div>
        {nextPlayer}
        <Boxes
          boxes={this.state.board}
          next={this.state.isX}
          clicked={this.boxClickedHandler}
        />
        <button onClick={this.newGameHandler}>new Game</button>
      </div>
    );
  }
}

export default Board;
