import c from "../utils/constants";

//
class Generator extends Actor  {
  constructor(board) {
    super(board);

    // automatic turn, because it is AI
    this.on("ready", ()=>{
      this.doTurn();
    });
  }

  doTurn(location, to) {
    let free = this.board.getFreeFields();
    if (free.length > 0) {
      let index = Math.random()*free.length;
      this.turn.resolve([c.ACTION_GENERATE, free[index]]);
    }
    this.turn.resolve([c.ACTION_SKIP]);
  }
};

export default Generator;
