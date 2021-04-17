import React, { Component } from "react";
import Boxes from "./Boxes";

const AI_PLAYER = "X";
const HUMAN_PLAYER = "O";
class Board extends Component {
  state = {
    board: Array(9).fill(null),
    isX: true
  };

  boxClickedHandler = (idx, player) => {
    const newBoard = [...this.state.board];
    if (newBoard[idx] !== null || this.checkWinner(this.state.board)) {
      return;
    }
    newBoard[idx] = player;

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

  availableIndex = (board) => {
    var availIdx = [];
    for (let i = 0; i < 9; i++) {
      if (board[i] !== "X" && board[i] !== "O") {
        availIdx.push(i);
      }
    }
    return availIdx;
  };

  makeMove = (idx, player) => {
    const newBoard = [...this.state.board];
    if (newBoard[idx] !== null || this.checkWinner(this.state.board)) {
      return;
    }
    newBoard[idx] = player;

    this.setState({ board: newBoard, isX: !this.state.isX });
  };

  minimax = (board, player) => {
    var availableIdx = this.availableIndex(board);
    var winner = this.checkWinner(board);

    // return 0 if there is no winner and not more empty spot
    // because these mean game is draw
    if (winner === null && availableIdx.length === 0) {
      return 0;
    }

    // return 10 if AI wins and -10 if human wins
    if (winner !== null) {
      if (winner === AI_PLAYER) {
        return 10;
      } else if (winner === HUMAN_PLAYER) {
        return -10;
      }
    }

    // list collects all moves
    var moves = [];

    for (let i = 0; i < availableIdx.length; i++) {
      // create move to store informations of the move
      var move = {};
      move.index = availableIdx[i];

      // make new board with move of player
      board[availableIdx[i]] = player;

      if (player === AI_PLAYER) {
        var result = this.minimax(board, HUMAN_PLAYER);
        move.score = result;
      } else {
        var result = this.minimax(board, AI_PLAYER);
        move.score = result;
      }

      //store move
      moves.push(move);
      // reset move for next move
      board[availableIdx[i]] = null;
    }

    // with the moves now choose best move
    var bestMove;
    // AI want high score
    if (player === AI_PLAYER) {
      var bestScore = -100;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i].index;
        }
      }
    } else {
      // human want lower score
      var bestScore = 100;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i].index;
        }
      }
    }

    this.boxClickedHandler(bestMove, AI_PLAYER);
  };

  render() {
    let nextPlayer = this.state.isX ? <h3>X player</h3> : <h3>O player</h3>;
    const winner = this.checkWinner(this.state.board);

    if (winner !== null) {
      nextPlayer = <h3>Winner is {winner}</h3>;
    } else if (this.availableIndex(this.state.board).length === 0) {
      nextPlayer = <h3>Draw</h3>;
    }

    const newBoard = [...this.state.board];
    if (this.state.isX === true) {
      this.minimax(newBoard, AI_PLAYER);
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
