    ////////////////
  ////Functions////
/////////////////
var method = function(event) {
  //call board
};

var printToBoard = function() {
  clear(boardCanvas, bctx);
  printPlayers(bctx, game.getPlayers(), game.getCurrentPlayer());
  printTurnScore(bctx, game.board.score())
  printCoordinates(bctx);
  printBoard(bctx, game.board.getBoard(), game.board.validMoves());
};

var addPieceToHand = function(event) {
  const shape = getShapeFromRadio();
  const color = getColorFromRadio();

  if (shape !== undefined && color !== undefined) {
    game.addPieceToHand(new Piece(color, shape));
  } else {
    alert("No Color and/or Shape selected");
  }

  printHand(handCanvas, hctx, game.returnHand(), game.getSelected());
};

var calculateGreediest = function(event) {
  var message = game.calculateGreediest();
  document.getElementById("Log").value = message;
};

var playPiece = function(canvasX, canvasY) {
  const x = Math.floor(canvasX / TILE_WIDTH);
  const y = Math.floor(canvasY / TILE_WIDTH);

  var piece;
  if (game.getSelected() === null ) {
    let shape = getShapeFromRadio();
    let color = getColorFromRadio();
    if (shape !== undefined && color !== undefined) {
      game.playPiece(x,y, new Piece(color, shape));
    } else {
      alert("No Color and/or Shape selected");
    }
  } else {
    game.playPieceFromHand(x, y);
  }

  printToBoard();
  printHand(handCanvas, hctx, game.returnHand(), game.getSelected());
}

var canvasClickHand = function(event) {
  if(event.offsetY >= 0) {
    game.setSelected(Math.floor(event.offsetY / HAND_WIDTH));
    printHand(handCanvas, hctx, game.returnHand(), game.getSelected());
  }
}

var canvasClickBoard = function(event) {
  const x = event.offsetX - BOARD_X;
  const y = event.offsetY - BOARD_Y;
  playPiece(x, y);
}

var unselectTile = function(event) {
  game.setSelected(null);
  printHand(handCanvas, hctx, game.returnHand(), game.getSelected());
}

var removeTile = function(event) {
  game.removePieceFromHand();
  printHand(handCanvas, hctx, game.returnHand(), game.getSelected());
}

var clearHand = function(event) {
  game.clearHand();
  printHand(handCanvas, hctx, game.returnHand(), game.getSelected());
}

var resetTurn = function(event) {
  game.resetTurn();
  printToBoard();
  printHand(handCanvas, hctx, game.returnHand(), game.getSelected());
};

var endTurn = function(event) {
  game.endTurn();
  printToBoard();
};

var endGame = function(event) {
  game.endGame();
  printToBoard();
};

var getColorFromRadio = function() {
  var radios = document.getElementsByName('colors');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked)
    {
      return Colors[radios[i].value];
    }
  }
};

var getShapeFromRadio = function() {
  var radios = document.getElementsByName('shapes');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked)
    {
      return Shapes[radios[i].value];
    }
  }
};

    ///////////
  ////Main////
////////////
var game = new Qwirkle();
game.setup(NUM_PLAYERS);
var handCanvas;
var boardCanvas;
var hctx;
var bctx;

    /////////////
  ////Events////
//////////////
window.onload = function() {
  //window.addEventListener("", method);
  document.getElementById("AddTile").addEventListener("click", addPieceToHand);
  document.getElementById("ClearHand").addEventListener("click", clearHand);
  document.getElementById("RemoveTile").addEventListener("click", removeTile);
  document.getElementById("UnselectTile").addEventListener("click", unselectTile);
  document.getElementById("ResetTurn").addEventListener("click", resetTurn);
  document.getElementById("EndTurn").addEventListener("click", endTurn);
  document.getElementById("CalculateGreediest").addEventListener("click", calculateGreediest);
  document.getElementById("EndGame").addEventListener("click", endGame);
  handCanvas = document.getElementById('hand');
  handCanvas.addEventListener("click", canvasClickHand);
  hctx = handCanvas.getContext('2d');
  boardCanvas = document.getElementById('board');
  boardCanvas.addEventListener("click", canvasClickBoard);
  bctx = boardCanvas.getContext('2d');

  printToBoard();
}
