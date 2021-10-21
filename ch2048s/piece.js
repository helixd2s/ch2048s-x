import c from "utils/constants";

// 
class Pieces {
  constructor(board) {
    this.board = board;
  }

  checkAvailability(unit) {
    let board = this.board;
    let piece = field.piece;
    let location = field.location;
    let [x, y] = location;
    let available = [];

    let checkAttackTurn = (current, direction, breakCb)=>{
      let another = board.getUnit(current);
      let latest = null;
      if (another) {
        if (another.availableFor(unit)) {
          latest = [...current];
        }
        if (breakCb) { breakCb(); };
      }
      return latest;
    };

    let checkFreeTurn = (current, direction, breakCb)=>{
      let another = board.getUnit(current);
      let latest = null;
      if (!another) {
        latest = [...current];
      } else {
        if (breakCb) { breakCb(); };
      }
      return latest;
    };

    let checkTurn = (current, direction, breakCb)=>{
      let another = board.getUnit(current);
      let latest = null;
      if (another) {
        if (another.availableFor(unit)) {
          latest = [...current];
        }
        if (breakCb) { breakCb(); };
      } else {
        latest = [...current];
      }
      return latest;
    };

    switch(true) {
      case (piece&c.PIECE_PAWN): {
        let yDirection = unit.fraction == WHITE ? -1 : 1;
        this.processFields(board, unit, [-1, yDirection], checkAttackTurn, available);
        this.processFields(board, unit, [ 1, yDirection], checkAttackTurn, available);
        this.processFields(board, unit, [ 0, yDirection], checkFreeTurn, available);
      };
      case (piece&c.PIECE_KING): {
        this.processFields(board, unit, [ 1, 0], checkTurn, available);
        this.processFields(board, unit, [ 1, 1], checkTurn, available);
        this.processFields(board, unit, [ 1,-1], checkTurn, available);
        this.processFields(board, unit, [-1, 0], checkTurn, available);
        this.processFields(board, unit, [-1, 1], checkTurn, available);
        this.processFields(board, unit, [-1,-1], checkTurn, available);
        this.processFields(board, unit, [ 0, 1], checkTurn, available);
        this.processFields(board, unit, [ 0,-1], checkTurn, available);
      };
      case (piece&c.PIECE_ROOK): {
        this.processFields(board, unit, [ 1, 0], checkTurn, available);
        this.processFields(board, unit, [-1, 0], checkTurn, available);
        this.processFields(board, unit, [ 0, 1], checkTurn, available);
        this.processFields(board, unit, [ 0,-1], checkTurn, available);
      };
      case (piece&c.PIECE_BISHOP): {
        this.processFields(board, unit, [ 1, 1], checkTurn, available);
        this.processFields(board, unit, [ 1,-1], checkTurn, available);
        this.processFields(board, unit, [-1, 1], checkTurn, available);
        this.processFields(board, unit, [-1,-1], checkTurn, available);
      };
      case (piece&c.PIECE_KNIGHT): {
        this.processFields(board, unit, [ 2,-1], checkTurn, available);
        this.processFields(board, unit, [ 2, 1], checkTurn, available);
        this.processFields(board, unit, [ 1,-2], checkTurn, available);
        this.processFields(board, unit, [ 1, 2], checkTurn, available);
        this.processFields(board, unit, [-2,-1], checkTurn, available);
        this.processFields(board, unit, [-2, 1], checkTurn, available);
        this.processFields(board, unit, [-1,-2], checkTurn, available);
        this.processFields(board, unit, [-1, 2], checkTurn, available);
      };
    }

    // rm duplicates
    return available.filter(( t={}, a=> !(t[a]=a in t) ));
  }
  
  processFields(unit, direction, callback, available) {
    let board = this.board;
    let piece = unit.piece;
    let location = unit.location;
    let [dx, dy] = direction;
    let [x, y] = location;
    let latest = null;
    switch(true) {
      case (piece&c.PIECE_KING): {
        //let px = x, py = y;
        let sx = x, sy = y;
        if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1 && board.inbound(sx+dx,sy+dy)) {
          let got = callback({current: [sx+dx,sy+dy], direction});
          if (got) { latest = got; };
        }
      };
      case (piece&c.PIECE_PAWN): {
        //let px = x, py = y;
        let sx = x, sy = y;
        if (Math.abs(dx) <= 1 && Math.abs(dy) == 1 && board.inbound(sx+dx,sy+dy)) {
          let got = callback({current: [sx+dx,sy+dy], direction});
          if (got) { latest = got; };
        }
      };
      case ((piece&c.PIECE_ROOK)|(piece&c.PIECE_BISHOP)): {
        //let px = x, py = y;
        let sx = x, sy = y;
        if (
          ((piece&c.PIECE_ROOK) && ((Math.abs(dx) == 1 && Math.abs(dy) == 0) || (Math.abs(dy) == 1 && Math.abs(dx) == 0))) ||
          ((piece&c.PIECE_BISHOP) && (Math.abs(dx) == 1 && Math.abs(dy) == 1 && Math.abs(dx) == Math.abs(dy)))
        ) {
          for (sx=x+dx,sy=y+dy,brk=false;board.inbound(sx,sy)&&!brk;sx+=dx,sy+=dy) {
            let got = callback({current: [sx,sy], direction}, ()=>{ brk = true; });
            if (got) { latest = got; };
            if (brk) { break; };
            //px = sx, py = sy;
          }
        }
      };
      case (piece&c.PIECE_KNIGHT): {
        //let px = x, py = y;
        let sx = x, sy = y;
        if (Math.abs(dx) == 2 && Math.abs(dy) == 1 || Math.abs(dx) == 1 && Math.abs(dy) == 2 && board.inbound(sx+dx,sy+dy)) {
          let got = callback({current: [sx+dx,sy+dy], direction});
          if (got) { latest = got; };
        }
      };
    }
    if (latest) { available.push(latest); };
    return latest;
  }
}

export default Pieces;
