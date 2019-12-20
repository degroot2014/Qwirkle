class Piece {
  constructor(color, shape) {
    if (color || shape) {
      this.setPiece(color,shape);
    } else {
      this.setPiece(null, null);
    }
  }

  copy() {
    return new Piece(this.color, this.shape);
  }

  setPiece(color,shape) {
    this.color = color;
    this.shape = shape;
  }

  isOccupied() {
    return this.color != null || this.shape != null;
  }
}
