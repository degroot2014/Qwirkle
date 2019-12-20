class Qwirkle {
  constructor() {
    this.board = new Board();
    this.players = [];
    this.currentPlayer = 0;
    this.selectedTile = null;
  }

  setup(numberOfPlayers) {
    let { players } = this;
    players.push(new Player(true));
    while (players.length < numberOfPlayers) {
      players.push(new Player());
    }
  }
  //Add piece to hand
  addPieceToHand(piece) {
    let { players } = this;
    players[this.getPrimaryPlayer()].addToHand(piece);
  }

  removePieceFromHand() {
    let { players, selectedTile } = this;
    if (selectedTile !== null) {
      players[this.getPrimaryPlayer()].removeFromHand(selectedTile);
      this.setSelected(null);
    }
  }

  clearHand() {
    let { players } = this;
    this.setSelected(null);
    players[this.getPrimaryPlayer()].clearHand();
  }

  getPrimaryPlayer() {
    let i;
    for(i = 0; i < this.players.length; i++) {
      if (this.players[i].isPrimary()) {
        return i;
      }
    }
  }

  returnHand() {
    return this.players[this.getPrimaryPlayer()].getHand();
  }

  setSelected(selected) {
    if (selected < this.returnHand().length || selected === null) {
      this.selectedTile = selected;
    }
  }

  getSelected() {
    return this.selectedTile;
  }

  getPlayers() {
    return this.players;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  calculateGreediest() {
    var moveList = [];
    this.getAllMovesForHand(this.board, this.players[this.getPrimaryPlayer()].getHand(), moveList);
    var max = [moveList[0].score(), moveList[0]];
    for(let i = 1; i < moveList.length; i++) {
      let score = moveList[i].score();
      if (score > max[0]) {
        max = [score, moveList[i]]
      }
    }

    let message = "Greed Turn: Score(" + max[0] + ")";
    for(let i = 0; i < max[1].moves.length; i++) {
      let x = max[1].moves[i][0];
      let y = max[1].moves[i][1];
      message += "\n" + pieceText(max[1].board[y][x]) + " at (" + (max[1].unadjustedMoves[i][0] + 1) + "," + (max[1].unadjustedMoves[i][1] + 1) + ")";
    }
    return message;
  }

  getAllMovesForHand(board, hand, moveList) {
    var boardCopy = board.copy();
    boardCopy.saveBoard();
    moveList.push(boardCopy);

    if (hand.length <= 0) {
      return;
    }

    var validMoves = boardCopy.validMoves();
    for(let i = 0; i < validMoves.length; i++) {
      for(let j = 0; j < hand.length; j++) {
        let piece = hand[j].copy();
        let remainingHand = arrayCopy(hand);;
        remainingHand.splice(j, 1);
        if (boardCopy.playPiece(piece, validMoves[i][0], validMoves[i][1])) {
          this.getAllMovesForHand(boardCopy, remainingHand, moveList);
        }
        boardCopy.loadBoard();
      }
    }

    return;
  }

  //Play piece
  playPiece(x, y, piece) {
    this.board.playPiece(piece, x, y);
  }

  //Play piece from hand
  playPieceFromHand(x, y) {
    var message;
    const piece = this.players[this.getPrimaryPlayer()].getHand()[this.selectedTile];
    if (this.board.playPiece(piece, x, y)) {
        this.removePieceFromHand();
    } else {
      message = "Cannot play piece at (" + x + "," + y + ")";
    }

  }

  resetTurn() {
    this.board.resetTurn();
    this.players[this.currentPlayer].resetHand();
  }

  endTurn() {
    this.players[this.currentPlayer].addScore(this.board.score());

    this.currentPlayer++;
    if (this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
    }
    this.players[this.currentPlayer].saveHand();
    this.board.endTurn();
  }

  //End Game
  endGame() {
	  this.players[this.currentPlayer].addScore(FINAL_PLAY);
  }

}
