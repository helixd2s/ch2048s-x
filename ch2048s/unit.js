import c from "utils/constants";

// 
class Unit {
  constructor(board, location, piece) {
    this.board = board;
    this.location = location;
    this.piece = piece;
    this.value = 2;
    this.fraction = c.FRACTION_WHITE;
    this.available = [];
  }

  availableFor(field) {
    return this.value == field.value;
  }
};

export default Unit;
