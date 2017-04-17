import {createSelector} from "reselect";
import {currentPositionSelector} from "../../selectors";
import {range} from "../../utils";
import PositionBuilder, {Position} from "../../simulation/position";

const positionSelector = createSelector(
  currentPositionSelector,
  (pos: Position) => PositionBuilder.fromPosition(pos),
);

export const boardSquaresSelector = createSelector(
  positionSelector,
  (pos: PositionBuilder) => range(0, pos.getSize())
    .map(row => range(0, pos.getSize())
      .map(column => ({
        safe: pos.isSafe(column, row),
        queenPlaced: pos.isQueenPlacedAt(column, row),
        placedByUser: pos.isQueenPlacedByUserAt(column, row),
        visited: pos.isVisited(column, row),
        text: pos.getTextAt(column, row),
      }))
    ),
);
