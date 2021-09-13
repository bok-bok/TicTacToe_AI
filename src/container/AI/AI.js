const AI_PLAYER = "X";
const HUMAN_PLAYER = "O";

const minimaxRoot = (
  board,
  player,
  boxClickedHandler,
  availableIndex,
  checkWinner
) => {
  var availableIdx = availableIndex(board);
  var winner = checkWinner(board);
  const depth = 0;
  // return 0 if game result is draw
  if (winner === null && availableIdx.length === 0) {
    return 0;
  }

  // return 10 if AI wins and -10 if human wins

  if (winner === AI_PLAYER) {
    return 10;
  } else if (winner === HUMAN_PLAYER) {
    return -10;
  }

  // list collects all moves
  var moves = [];

  for (let i = 0; i < availableIdx.length; i++) {
    // create move to store informations of the move
    var move = {};
    move.index = availableIdx[i];

    // make new board with move of player
    board[availableIdx[i]] = player;
    let result;
    if (player === AI_PLAYER) {
      result = minimax(depth, board, HUMAN_PLAYER, availableIndex, checkWinner);
      move.score = result;
    } else {
      result = minimax(depth, board, AI_PLAYER, availableIndex, checkWinner);
      move.score = result;
    }

    //store move
    moves.push(move);
    // reset move for next move
    board[availableIdx[i]] = null;
  }

  // with the moves now choose best move
  let bestMove;
  let bestScore;
  // AI want high score
  if (player === AI_PLAYER) {
    bestScore = -9999;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i].index;
      }
    }
  } else {
    // human want lower score
    bestScore = 9999;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i].index;
      }
    }
  }

  boxClickedHandler(bestMove, AI_PLAYER);
};

const minimax = (depth, board, player, availableIndex, checkWinner) => {
  var availableIdx = availableIndex(board);
  var winner = checkWinner(board);

  // return 0 if game result is draw
  if (winner === null && availableIdx.length === 0) {
    return 0;
  }

  // return 10 if AI wins and -10 if human wins

  if (winner === AI_PLAYER) {
    if (depth === 0) {
      return 1000;
    }
    return 10;
  } else if (winner === HUMAN_PLAYER) {
    return -10;
  }

  let score = 0;
  for (let i = 0; i < availableIdx.length; i++) {
    // create move to store informations of the move

    // make new board with move of player
    board[availableIdx[i]] = player;
    let result;
    if (player === AI_PLAYER) {
      result = minimax(
        depth + 1,
        board,
        HUMAN_PLAYER,
        availableIndex,
        checkWinner
      );
      score = score + result;
    } else {
      result = minimax(
        depth + 1,
        board,
        AI_PLAYER,
        availableIndex,
        checkWinner
      );
      score = score + result;
    }

    // reset move for next move
    board[availableIdx[i]] = null;
  }

  // with the moves now choose best move
  // let bestMove;
  // let bestScore;
  // AI want high score
  // if (player === AI_PLAYER) {
  //   bestScore = -9999;
  //   for (let i = 0; i < moves.length; i++) {
  //     if (moves[i].score > bestScore) {
  //       bestScore = moves[i].score;
  //       bestMove = moves[i].index;
  //     }
  //   }
  // } else {
  //   // human want lower score
  //   bestScore = 9999;
  //   for (let i = 0; i < moves.length; i++) {
  //     if (moves[i].score < bestScore) {
  //       bestScore = moves[i].score;
  //       bestMove = moves[i].index;
  //     }
  //   }
  // }
  return score;
};

export default minimaxRoot;
