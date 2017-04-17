import PositionBuilder, {Position} from "./position";
import {range} from "../utils";
import {Solution, Solver} from "./solver";

const pickRandomColumn = (pos: PositionBuilder): number => {
  return Math.floor(Math.random() * pos.getSize());
};

const calculateOptimalQueenRow = (pos: PositionBuilder, column: number): number => {
  const currentPlacement = pos.getQueenAt(column);
  const conflicts = range(0, pos.getSize())
    .map(row => ({
      row, column,
      conflicts: pos.conflictsAt(column, row),
    }));

  const minConflicts = conflicts
    .map(x => x.conflicts)
    .reduce((min, conflict) => conflict < min ? conflict : min, 1000);

  const choices = conflicts
    .filter(x => x.conflicts === minConflicts)
    .filter(x => x.row !== currentPlacement)
    .map(x => x.row);

  const rand = Math.floor(Math.random() * choices.length);
  return choices.length ? choices[rand] : currentPlacement;
};

const pickRandomColumnWithConflicts = (pos: PositionBuilder): number => {
  const size = pos.getSize();
  const conflictedColumns = range(0, size)
    .map(column => ({
      column,
      row: pos.getQueenAt(column),
    }))
    // .filter(({column, row}) =>
    //   !pos.isUserQueenPlacedAt(column, row))
    .map(square => ({
      ...square,
      hasConflicts: pos.conflictsAt(square.column, square.row) > 0,
    }))
    .filter(square => square.hasConflicts);

  if (!conflictedColumns.length) {
    return -1;
  }

  const rand = Math.floor(Math.random() * conflictedColumns.length);
  return conflictedColumns[rand].column;
};

const chooseNextColumn = (pos: PositionBuilder): number => {
  if (pos.findEmptyColumn() !== -1) {
    return pos.findEmptyColumn();
  }

  return pickRandomColumnWithConflicts(pos);
};

const withConflictText = (pos: PositionBuilder, column: number): PositionBuilder => {
  pos = pos.withNoText();
  range(0, pos.getSize())
    .map(row => ({
      row, column,
      conflicts: pos.conflictsAt(column, row),
    }))
    .forEach(entry => {
      pos = pos.withText(column, entry.row, String(entry.conflicts));
    });
  return pos;
};

const mc = (pos: PositionBuilder, column: number, steps: Position[]): boolean => {
  if (pos.isSolved()) {
    return true;
  }

  let iterations = 0;
  let currentColumn = pos.findEmptyColumn();
  if (currentColumn === -1) {
    currentColumn = pickRandomColumn(pos);
  }

  pos = pos.withFocusedColumn(currentColumn);
  pos = withConflictText(pos, currentColumn);
  steps.push(pos.build());

  do {
    iterations++;

    const row = calculateOptimalQueenRow(pos, currentColumn);
    pos = pos.withQueen(currentColumn, row);

    if (pos.isSolved()) {
      pos = pos.withFocusedColumn(-1).withNoText();
      steps.push(pos.build());
      return true;
    }

    const nextColumn = chooseNextColumn(pos);
    pos = pos.withFocusedColumn(nextColumn);
    pos = withConflictText(pos, nextColumn);
    steps.push(pos.build());
    currentColumn = nextColumn;
  } while (iterations < 100);

  return false;
};

const MinConflict: Solver = (pos: Position): Solution => {
  const builder = PositionBuilder.fromPosition(pos);
  const firstColumn = builder.findEmptyColumn();
  let steps: Position[] = [];

  let solved = false, iterations = 0;
  while (!solved && iterations++ < 5) {
    steps = [];
    solved = mc(builder, firstColumn, steps);
  }

  return {
    solved: solved,
    steps: steps,
  };
};

export default MinConflict;
