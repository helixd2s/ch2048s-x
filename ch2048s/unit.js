

class Unit {
  constructor(board, location, mask) {
    this.board = board;
    this.location = location;
    this.mask = mask;
    this.value = 2;
    this.fraction = FRACTION_WHITE;
    this.available = [];
  }

  availableFor(field) {
    return this.value == field.value;
  }
};

export default Unit;
