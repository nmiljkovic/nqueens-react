import PositionBuilder, {Position} from "./position";
import {Solution, Solver} from "./solver";
import {range} from "../utils";

function diag(size: number, column: number, row: number): number {
  ++row;
  ++column;
  return Math.max(
    row + column + 1,
    2 * size - row - column + 1
  );
}

function heuristic(pos: PositionBuilder, column: number, row: number): number {
  const size = pos.getSize();
  return size * diag(size, column, row) + column;
}

function getEligibleSquares(pos: PositionBuilder, column: number) {
  return range(0, pos.getSize())
    .filter(row => pos.isSafe(column, row))
    .map(row => ({
      column: column,
      row: row,
      heuristic: heuristic(pos, column, row),
    }));
}

function withHeuristic(pos: PositionBuilder, column: number): PositionBuilder {
  getEligibleSquares(pos, column).forEach(square => {
    pos = pos.withText(
      square.column,
      square.row,
      String(square.heuristic),
    );
  });
  return pos;
}

const hc = (pos: PositionBuilder, column: number, steps: Position[]): boolean => {
  if (column === -1) {
    steps.push(pos.build());
    return pos.isSolved();
  }

  pos = pos.withNoText();
  pos = withHeuristic(pos, column);
  pos = pos.withFocusedColumn(column);
  steps.push(pos.build());

  return getEligibleSquares(pos, column)
    .sort((a, b) => a.heuristic - b.heuristic)
    .some(square => {
      const row = square.row;
      pos = pos.withQueen(column, row);

      const nextColumn = pos.findEmptyColumn();
      pos = pos.withFocusedColumn(nextColumn);

      if (hc(pos, nextColumn, steps)) {
        return true;
      }

      pos = pos
        .withoutQueen(column)
        .withFocusedColumn(column);
      steps.push(pos.build());
      return false;
    });
};

const HillClimbing: Solver = function DfsSolver(pos: Position): Solution {
  const builder = PositionBuilder.fromPosition(pos);
  const steps: Position[] = [];
  const firstColumn = builder.findEmptyColumn();

  const solved = hc(builder, firstColumn, steps);

  return {
    solved: solved,
    steps: steps,
  };
};

export default HillClimbing;
