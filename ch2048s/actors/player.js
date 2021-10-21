

// 
class Player extends Actor {
  constructor(board) {
    super(board);
  }

  doTurn(location, to) {
    let unit = this.board.getUnit(location);
    if (unit) {
      let index = unit.available.findIndex((location)=>{ return location[0] == to[0] && location[1] == to[1]; });
      if (index >= 0) {
        this.turn.resolve([ACTION_TURN, unit, to]);
      } 
    }
  }
};

export default Player;
