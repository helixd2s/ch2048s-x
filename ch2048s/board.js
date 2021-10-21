import c from "utils/constants";

// 
class Board {
  constructor(pieces, width, height) {
    this.units = {};
    this.width = width;
    this.height = height;
    this.pieces = pieces;
    this.pieces.board = this;
    this.playing = false;
    this.actors = [];
  }

  scanAvailable() {
    this.units.forEach((unit)=>{
      unit.available = this.pieces.checkAvailability(this, unit);
    });
  }

  inbound(location) {
    return location[0] >= 0 && location[1] >= 0 && location[0] < this.width && location[1] < this.height;
  }

  getFreeFields() {
    let available = [];
    for (let x=0;x<this.width;x++) {
      for (let y=0;y<this.height;y++) {
        if (!this.getUnit([x, y])) { available.push([x,y]); };
      }
    }
    return available;
  }

  addUnit(unit) {
    unit.board = this;
    this.units.push(unit);
  }

  getUnit(location) {
    return this.units.find((element)=>{
      return (element.location[0] == location[0] && element.location[1] == location[1]);
    });
  }

  removeUnit(unit) {
    let index = this.units.indexOf(unit);
    if (index >= 0) { this.units.splice(index,1); };
  }
}

export default Board;