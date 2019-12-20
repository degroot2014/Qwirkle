////////////////
////Constants////
/////////////////
const TILE_WIDTH = 30;
const HAND_TILE_WIDTH = 70;
const BOARD_COORD_WIDTH = 80;
const SCORE_OFFSET = 20;
const HAND_WIDTH = 80;
const SPRITE_LOCATION = "Assets/TileSprites.png";
const HAND_OFFSET = 5;
const MAX_HAND = 6;
const TILE_SPRITE_X = 0;
const TILE_SPRITE_Y = 420;
const TILE_BLANK_SPRITE_X = 620;
const TILE_BLANK_SPRITE_Y = 420;
const HIGHLIGHT_X = 540;
const HIGHLIGHT_Y = 420;
const BOARD_X = 35;
const BOARD_Y = 75;
const HIGHLIGHT_WIDTH = 80;
const STAR = "\u2605";
const QWIRKLE = 6;
const FINAL_PLAY = 6;
const NUM_PLAYERS = 4;

function arrayContains(base, search) {
  let i, j, current;
  for(i = 0; i < base.length; i++) {
    if (base[i].length == search.length) {
      for(j = 0; j < base[i].length && base[i][j] === search[j]; j++);
      if(search.length === j) {
        return true;
      }
    }
  }
  return false;
}

function arrayCopy(base) {
  var copy = [];
  let x, y;
  for(y = 0; y < base.length; y++) {
    if (Array.isArray(base[y])) {
      copy.push([]);
      for(x = 0; x < base[y].length; x++) {
        if (typeof base[y][x] === 'object') {
          copy[y][x] = base[y][x].copy();
        } else {
          copy[y][x] = base[y][x];
        }
      }
    } else {
      copy.push(base[y].copy());
    }
  }

  return copy;
}

function getSpriteLocation(piece) {
  let x = 0;
  let y = 0;
  //Shape = X
  switch (piece.color) {
    case Colors.RED: break;
    case Colors.BLUE:
      y = 1;
      break;
    case Colors.PURPLE:
      y = 2;
      break;
    case Colors.YELLOW:
      y = 3;
      break;
    case Colors.GREEN:
      y = 4;
      break;
    case Colors.ORANGE:
      y = 5;
      break;
    default:
      y = 6;
  }
  //Color = Y
  switch (piece.shape) {
    case Shapes.DIAMOND: break;
    case Shapes.CLOVER:
      x = 1;
      break;
    case Shapes.SQUARE:
      x = 2;
      break;
    case Shapes.CIRCLE:
      x = 3;
      break;
    case Shapes.FANCY_STAR:
      x = 4;
      break;
    case Shapes.STAR:
      x = 5;
      break;
    default:
      x = 6;
  }
  return [x, y];
}

function pieceText(piece) {
  let message = "";

  switch (piece.color) {
    case Colors.RED:
      message += "Red ";
      break;
    case Colors.BLUE:
      message += "Blue ";
      break;
    case Colors.PURPLE:
      message += "Purple ";
      break;
    case Colors.YELLOW:
      message += "Yellow ";
      break;
    case Colors.GREEN:
      message += "Green ";
      break;
    default:
      message += "Orange ";
  }

  switch (piece.shape) {
    case Shapes.DIAMOND:
      message += "Diamond ";
      break;
    case Shapes.CLOVER:
      message += "Clover ";
      break;
    case Shapes.SQUARE:
      message += "Square ";
      break;
    case Shapes.CIRCLE:
      message += "Circle ";
      break;
    case Shapes.FANCY_STAR:
      message += "Fancy Star ";
      break;
    default:
      message += "Star ";
  }
  return message;
}

function getHandSpriteLocation(piece) {
  var coord = getSpriteLocation(piece);
  return coord.map(x => x * HAND_TILE_WIDTH);
}

function getTileSpriteLocation(piece) {
  var coord = getSpriteLocation(piece);
  if (coord[0] < Object.keys(Shapes).length && coord[1] < Object.keys(Colors).length) {
    return [(coord[0] * TILE_WIDTH) + TILE_SPRITE_X, (coord[1] * TILE_WIDTH) + TILE_SPRITE_Y];
  }
  return [TILE_BLANK_SPRITE_X, TILE_BLANK_SPRITE_Y];
}

const Colors = Object.freeze({
  RED: Symbol("red"),
  BLUE: Symbol("blue"),
  PURPLE: Symbol("purple"),
  YELLOW: Symbol("yellow"),
  GREEN: Symbol("green"),
  ORANGE: Symbol("orange")
})

const Shapes = Object.freeze({
  DIAMOND: Symbol("diamond"),
  CLOVER: Symbol("clover"),
  SQUARE: Symbol("square"),
  CIRCLE: Symbol("circle"),
  FANCY_STAR: Symbol("fstar"),
  STAR: Symbol("star")
})
