import c from "../utils/constants";

//
class Actor {
  constructor(board) {
    this.board = board;
    this.listener = [];
    this.didFreeTurn = true;
  }

  // currently name not supported 
  on(name, cb) {
    this.listener.push(cb);
  }

  awaitTurn() {
    return this.turn.promise;
  }

  signalForTurn() {
    this.turn = {
      promise: new Promise((resolve, reject)=>{
        this.turn.resolve = resolve;
        this.turn.reject = reject;
      })
    };
    this.listener.forEach((cb)=>{cb();});
  }

  doTurn(location, to) {
    this.turn.resolve([c.ACTION_SKIP]);
  }
}

export default Actor;