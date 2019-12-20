class Player {
  constructor(primary = false) {
    this.hand = [];
    this.savedHand = [];
    this.score = 0;
    this.primary = primary;
  }

  setScore(score) {
    this.score = score;
  }

  getScore() {
    return this.score;
  }

  addScore(score) {
    this.score += score;
  }

  addToHand(piece) {
    if (this.hand.length < MAX_HAND) {
      this.hand.push(piece);
    }
  }

  removeFromHand(spot) {
    return this.hand.splice(spot, 1);
  }

  clearHand() {
    this.hand = [];
  }

  getHand() {
    return this.hand;
  }

  isPrimary() {
    return this.primary;
  }

  saveHand() {
    this.savedHand = arrayCopy(this.hand);
  }

  resetHand() {
    this.hand = arrayCopy(this.savedHand);
  }
}
