

function printHand(canvas, ctx, hand, selected) {
  const img = new Image();
  img.src = SPRITE_LOCATION;
  clear(canvas, ctx);
  if (selected !== null) {
    ctx.drawImage(img, HIGHLIGHT_X, HIGHLIGHT_Y, HIGHLIGHT_WIDTH, HIGHLIGHT_WIDTH, 0, (selected * HIGHLIGHT_WIDTH) - (selected * HAND_OFFSET), HIGHLIGHT_WIDTH, HIGHLIGHT_WIDTH);
  }

  for(let i = 0; i < hand.length; i++) {
    let coordinates = getHandSpriteLocation(hand[i]);

    ctx.drawImage(img, coordinates[0], coordinates[1], HAND_TILE_WIDTH, HAND_TILE_WIDTH, HAND_OFFSET, (HAND_TILE_WIDTH * i) + (HAND_OFFSET * i) + HAND_OFFSET, HAND_TILE_WIDTH, HAND_TILE_WIDTH);
  }
}

function clear(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function printPlayers(ctx, players, currentPlayer) {
  let x = 10;
  let y = 20;
  ctx.font = "20px Lucida Console";

  for(let i = 0; i < players.length; i++) {
    let text = "Player " + (i + 1);
    if (i === currentPlayer) {
      text += STAR;
    }
    ctx.fillText(text, x, y);
    ctx.fillText(players[i].getScore(), x, y + y);
    x += 250;
  }
}

function printTurnScore(ctx, score) {
  let x = 1010;
  let y = 20;
  ctx.font = "20px Lucida Console";

  ctx.fillText(score, x, y);
}

//Unused
function printCoordinates(ctx) {
//Tiles are 15px
  let i;
  for(let i = 0; i < 30; i++) {
    ctx.fillText((i + 1).toString(),42 + (i * TILE_WIDTH),72);
  }

  let y = 15;
  for(let i = 0; i < 30; i++) {
    ctx.fillText((i + 1), 0, (i * TILE_WIDTH) + TILE_WIDTH + 67);
  }
}

function printBoard(ctx, board, validMoves) {
  const img = new Image();
  img.src = SPRITE_LOCATION;

  for(let y = 0; y < board.length; y++){
    for(let x = 0; x < board[y].length; x++){
      let coord = getTileSpriteLocation(board[y][x]);
      ctx.drawImage(img, coord[0], coord[1], TILE_WIDTH, TILE_WIDTH, BOARD_X + (x * TILE_WIDTH), BOARD_Y + (y * TILE_WIDTH), TILE_WIDTH, TILE_WIDTH);
    }
  }

  for(let x = 0; x < validMoves.length; x++) {
    ctx.drawImage(img, TILE_BLANK_SPRITE_X, TILE_BLANK_SPRITE_Y + TILE_WIDTH, TILE_WIDTH, TILE_WIDTH, BOARD_X + (validMoves[x][0] * TILE_WIDTH), BOARD_Y + (validMoves[x][1] * TILE_WIDTH), TILE_WIDTH, TILE_WIDTH);
  }


}
