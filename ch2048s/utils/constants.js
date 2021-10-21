let constants = {
  ACTION_GENERATE: 0,
  ACTION_TURN: 1,
  FRACTION_GENERIC: 0,
  FRACTION_WHITE: 1,
  FRACTION_BLACK: 2,
  PIECE_PAWN: (1<<0),
  PIECE_ROOK: (1<<1),
  PIECE_BISHOP: (1<<2),
  PIECE_KNIGHT: (1<<3),
  PIECE_KING: (1<<4)
};

constants.PIECE_QUEEN = constants.PIECE_ROOK|constants.PIECE_BISHOP
export default constants;
