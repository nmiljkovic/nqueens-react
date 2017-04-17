import {Solution, Solver} from "./solver";
import PositionBuilder, {Position} from "./position";

const dfs = (pos: PositionBuilder, column: number, steps: Position[]): boolean => {
  if (column === -1) {
    return pos.isSolved();
  }

  // Find safe rows that the queen can be placed at
  const rows = [];
  for (let rowIndex = 0; rowIndex < pos.getSize(); rowIndex++) {
    if (pos.isSafe(column, rowIndex)) {
      rows.push(rowIndex);
    }
  }

  return rows.some(row => {
    pos = pos.withQueen(column, row);
    const nextColumn = pos.findEmptyColumn();
    pos = pos.withFocusedColumn(nextColumn);

    steps.push(pos.build());

    if (dfs(pos, nextColumn, steps)) {
      return true;
    }

    pos = pos
      .withoutQueen(column)
      .withFocusedColumn(column);
    steps.push(pos.build());
    return false;
  });
};

const DepthFirstSearch: Solver = (position: Position): Solution => {
  let pos = PositionBuilder.fromPosition(position);
  let steps: Position[] = [];
  let firstColumn = pos.findEmptyColumn();

  pos = pos.withFocusedColumn(firstColumn);
  steps.push(pos.build());

  let solved = dfs(pos, firstColumn, steps);

  return {
    solved: solved,
    steps: steps,
  };
};

export default DepthFirstSearch;