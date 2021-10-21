import c from "utils/constants";

// 
class Game {
  constructor(board, actors) {
    this.board = board;
    this.actors = actors;
    this.playing = false;
  }

  start() {
    let game = this;
    let board = this.board;
    let actors = this.actors;

    return (async function*(){
      game.playing = true;
      do {
        for (let actor of actors) {
          actor.signalForTurn(actors);
          let turn = yield (await actor.awaitTurn());
          switch (turn[0]) {
            case c.ACTION_TURN:
              turn[1].location = turn[2];
              let unit = board.getUnit(turn[2]);
              if (unit) {
                actor.didFreeTurn = false;
                turn[1].value += unit.value;
                board.removeUnit(unit);
              } else {
                actor.didFreeTurn = true;
              }
              break;
            case c.ACTION_GENERATE: 
              if (actor.didFreeTurn) {
                board.push(new Unit(board, turn[1], c.PIECE_QUEEN));
              };
              break;
            case c.ACTION_SKIP:
              break;
          }
        }
      } while(game.playing);

      return false;
    })();
  }
}

export default Game;
