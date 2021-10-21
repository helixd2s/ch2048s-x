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
            case ACTION_TURN:
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
            case ACTION_GENERATE: 
              if (actor.didFreeTurn) {
                board.push(new Unit(board, turn[1], PIECE_QUEEN));
              };
              break;
            case ACTION_SKIP:
              break;
          }
        }
      } while(game.playing);

      return false;
    })();
  }
}

export default Game;
