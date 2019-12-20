//Board that all classes will use
//Holds current state of the game
class Board {
  constructor() {
    this.board = [[new Piece()]];
    this.moves = [];
    this.savedMoves = [];
    this.savedBoard = [[new Piece()]];
    this.lastTurnMoves = [];

    this.unadjustedMoves = [];
    this.savedUnadjustedMoves =[];
  }

  copy() {
    var copy = new Board();
    copy.board = arrayCopy(this.board);
    copy.moves = arrayCopy(this.moves);
    copy.savedMoves = arrayCopy(this.savedMoves);
    copy.savedBoard = arrayCopy(this.savedBoard);
    copy.lastTurnMoves = arrayCopy(this.lastTurnMoves);

    copy.unadjustedMoves = arrayCopy(this.unadjustedMoves);
    copy.savedUnadjustedMoves = arrayCopy(this.savedUnadjustedMoves);
    return copy;
  }

  getBoard() {
    return this.board;
  }

  getMovesMade() {
    return this.moves;
  }

  //Clears current board
  resetBoard() {
    this.board = [[new Piece()]];
    this.lastTurnMoves = [];
  }

  saveBoard() {
    this.savedBoard = arrayCopy(this.board);
    this.savedMoves = arrayCopy(this.moves);
    this.savedUnadjustedMoves = arrayCopy(this.unadjustedMoves);
  }

  loadBoard() {
    this.board = arrayCopy(this.savedBoard);
    this.moves = arrayCopy(this.savedMoves);
    this.unadjustedMoves = arrayCopy(this.savedUnadjustedMoves);
  }

  endTurn() {
    this.lastTurnMoves = arrayCopy(this.moves);
    this.savedBoard = arrayCopy(this.board);
    this.moves = [];
    this.unadjustedMoves = [];
  }

  //Puts board back into the state before any pieces were played for the turn
  resetTurn() {
    this.board = arrayCopy(this.savedBoard);
    this.unadjustedMoves = [];
    this.moves = [];
  }

  //Returns a set of all locations that can have a piece played onto it
  validMoves() {
    const { board } = this;
    var validMoves = [];
    if (board.length === 1 && board[0].length === 1) {
      return [[0,0]];
    }
    let y,x;
    let piece = new Piece();
    for(y = 0; y < board.length; y++)
      for(x = 0; x < board[0].length; x++) {
        if (this.isMoveValid(piece, x, y)) {
          validMoves.push([x,y]);
        }
      }
      return validMoves;
  }

  //Returns score of the boards current moves
  score() {
    const { board, moves } = this;

    if (moves.length === 0) {
      return 0;
    }

    let score = 0;
    let scoredVertically = [];
    let scoredHorizontally = [];

    for(let i = 0; i < moves.length; i++) {
      const x = moves[i][0];
      const y = moves[i][1];

      var min = x;
      var max = x;
      while (min - 1 >= 0 && board[y][min - 1].isOccupied()) {
        min--;
      }
      while (max + 1 < board[y].length && board[y][max + 1].isOccupied()) {
        max++;
      }

      if (max !== min) {
        let rowCount = 0;
        while (min <= max) {
          if (!arrayContains(scoredHorizontally, [min, y])) {
            score++;
            rowCount++;
            scoredHorizontally.push([min, y]);
          }
          min++;
        }

        if (rowCount >= QWIRKLE) {
          score += QWIRKLE;
        }
      }

      min = max = y
      while (min - 1 >= 0 && board[min - 1][x].isOccupied()) {
        min--;
      }
      while (max + 1 < board.length && board[max + 1][x].isOccupied()) {
        max++;
      }

      if (max !== min) {
        let rowCount = 0;
        while (min <= max) {
          if (!arrayContains(scoredVertically, [x, min])) {
            score++;
            rowCount++;
            scoredVertically.push([x, min]);
          }
          min++;
        }

        if (rowCount >= QWIRKLE) {
          score += QWIRKLE;
        }
      }

    }

    return score;
  }

  //Places the piece onto board. Will also pad the playing field
  //Will throw an exception if move is not allowed.
  playPiece(piece, x, y) {
    const { board, moves, unadjustedMoves } = this;
    if (!this.isMoveValid(piece, x, y)){
      return false;
    }
    board[y][x] = piece;
    moves.push([x,y]);
    unadjustedMoves.push([x,y]);
    this.padBoard();
    return true;
  }

  //Will return if a piece can be played at position (X,Y) in the baord
  isMoveValid(piece, x, y) {
    let { board, moves } = this;

    //Check location is within board
    if (x < 0 || x >= board[0].length || y < 0 || y >= board.length) {
      return false;
    }

    if (board.length === 1 && board[0].length === 1) {
      return true;
    }

    //Spot must be open
    if (board[y][x].isOccupied()) {
      return false;
    }

    //Make sure it is next to another piece (Not Diagonal)
    var adjacentPieces = [];
    if ((y - 1) >= 0 && board[y - 1][x].isOccupied()) {
      adjacentPieces.push(board[y - 1][x]);
    }
    if ((y + 1) < board.length && board[y + 1][x].isOccupied()) {
      adjacentPieces.push(board[y + 1][x]);
    }
    if ((x - 1) >= 0 && board[y][x - 1].isOccupied()) {
      adjacentPieces.push(board[y][x - 1]);
    }
    if ((x + 1) < board[0].length && board[y][x + 1].isOccupied()) {
      adjacentPieces.push(board[y][x + 1]);
    }

    if (adjacentPieces.length === 0) {
      return false;
    }

    //Make sure this doesn't put 7 pieces in a row
    var horizontalRow = [piece];
    var verticalRow = [piece];
    let tempX= x + 1
    while (tempX < board[0].length && board[y][tempX].isOccupied()) {
      horizontalRow.push(board[y][tempX])
      tempX++;
    }
    tempX = x - 1;
    while (tempX >= 0 && board[y][tempX].isOccupied()) {
      horizontalRow.push(board[y][tempX])
      tempX--;
    }

    let tempY= y + 1
    while (tempY < board.length && board[tempY][x].isOccupied()) {
      verticalRow.push(board[tempY][x])
      tempY++;
    }
    tempY = y - 1;
    while (tempY >= 0 && board[tempY][x].isOccupied()) {
      verticalRow.push(board[tempY][x])
      tempY--;
    }

    if (horizontalRow.length > 6 || verticalRow.length > 6) {
      return false;
    }

    //Make sure this is part of the same row being played
    if (moves.length > 0) {
      var checkHorizontally = true;
      var checkVertically = true;
      var inPlay = false;

      if (moves.length > 1) {
        if (moves[0][0] === moves[1][0]) {
          checkHorizontally = false;
        }
        if (moves[0][1] === moves[1][1]) {
          checkVertically = false;
        }
      }

      if (checkHorizontally) { //board[y].length
        let tempX = x;
        while ( tempX - 1 >= 0  && board[y][tempX - 1].isOccupied()) {
          tempX--;
          if (arrayContains(moves,[tempX,y])) {
            inPlay = true;
          }
        }

        tempX = x;
        while ( tempX + 1 < board[y].length && board[y][tempX + 1].isOccupied()) {
          tempX++;
          if (arrayContains(moves,[tempX,y])) {
            inPlay = true;
          }
        }
      }

      if (checkVertically) {
        let tempY = y;
        while ( tempY - 1 >= 0 && board[tempY - 1][x].isOccupied()) {
          tempY--;
          if (arrayContains(moves,[x,tempY])) {
            inPlay = true;
          }
        }

        tempY = y;
        while ( tempY + 1 < board.length && board[tempY + 1][x].isOccupied()) {
          tempY++;
          if (arrayContains(moves,[x,tempY])) {
            inPlay = true;
          }
        }
      }

      if (!inPlay) {
        return false;
      }
    }

    //See if we need to do color and shape tests
    if (!piece.isOccupied()) {
      return true;
    }

    //Check that play doesn't break the shape/color rules
    if (!this.isRowValid(horizontalRow)) {
      return false;
    }
    if (!this.isRowValid(verticalRow)) {
      return false;
    }

    return true;
  }

  //Will return if a group of pieces is a valid combination
  //If all colors match then there should be no duplicate shapes
  //If all shapes match then there should be no duplicate colors
  isRowValid(row) {
    if (row.length === 1) {
      return true;
    }

    if (row.every(x => x.color === row[0].color)) {
      let shapes = [];
      for (let i = 0; i < row.length; i++) {
        if (shapes.includes(row[i].shape)) {
          return false;
        }
        shapes.push(row[i].shape);
      }

    } else if (row.every(x => x.shape === row[0].shape)) {
      let colors = [];
      for(let i = 0; i < row.length; i++) {
        if (colors.includes(row[i].color)) {
          return false;
        }
        colors.push(row[i].color);
      }

    } else {
      return false;
    }
    return true;
  }

  //Gives the board a clear boarder of spaces
  //there is no edge to the playing field
  //There should be a single space
  padBoard() {
    const { board } = this;

    //Check Top
    for(let i = 0; i < board[0].length; i++) {
      if(board[0][i].isOccupied()) {
        board.unshift(this.blankRow(board[0].length));
        this.moves = this.moves.map(x => [x[0], x[1] + 1]);
        this.lastTurnMoves = this.lastTurnMoves.map(x => [x[0], x[1] + 1]);
        break;
      }
    }
    //Check Bottom
    for(let i = 0; i < board[0].length; i++) {
      if(board[this.board.length - 1][i].isOccupied()) {
        board.push(this.blankRow(board[0].length));
        break;
      }
    }
    //Check Left Side
    for(let i = 0; i < board.length; i++) {
      if(board[i][0].isOccupied()) {
        for(let j = 0; j < board.length; j++) {
          board[j].unshift(new Piece());
        }
        this.moves = this.moves.map(x => [x[0] + 1, x[1]]);
        this.lastTurnMoves = this.lastTurnMoves.map(x => [x[0], x[1] + 1]);
        break;
      }
    }
    //Check Right Side
    for(let i = 0; i < board.length; i++) {
      if(board[i][board[i].length - 1].isOccupied()) {
        for(let j = 0; j < board.length; j++) {
          board[j].push(new Piece());
        }
        break;
      }
    }
  }

  blankRow(numColumns) {
    var row = [];
    for(let i = 0; i < numColumns; i++) {
      row.push(new Piece());
    }
    return row;
  }
}
