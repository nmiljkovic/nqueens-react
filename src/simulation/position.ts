export interface Position {
  queens: number[];
  userQueens: number[];
  focusedColumn: number;
  visited: {};
  text: {};
}

const FREE_SQUARE = -1;

export default class PositionBuilder {
  static fromPosition(position: Position): PositionBuilder {
    return new PositionBuilder(position);
  }

  static fromMatrix(matrix: number[][]): PositionBuilder {
    return new PositionBuilder(fromMatrix(matrix));
  }

  static createEmpty(size: number): PositionBuilder {
    let queens = [];
    for (let i = 0; i < size; i++) {
      queens.push(FREE_SQUARE);
    }
    return new PositionBuilder({
      queens, userQueens: queens,
      focusedColumn: -1,
      visited: {}, text: {},
    });
  }

  constructor(private position: Position) {
  }

  getQueenAt(column: number): number {
    if (getQueenAt(this.position.userQueens, column) !== FREE_SQUARE) {
      return getQueenAt(this.position.userQueens, column);
    }
    return getQueenAt(this.position.queens, column);
  }

  getTextAt(column: number, row: number): string {
    const text = this.position.text;
    if (!text.hasOwnProperty(column)) {
      return "";
    }
    if (!text[column].hasOwnProperty(row)) {
      return "";
    }
    return text[column][row];
  }

  isSafe(column: number, row: number): boolean {
    return (
      isSafe(this.position.queens, column, row) &&
      isSafe(this.position.userQueens, column, row)
    );
  }

  isColumnTaken(column: number): boolean {
    return (
      isColumnTaken(this.position.queens, column) ||
      isColumnTaken(this.position.userQueens, column)
    );
  }

  isQueenPlacedAt(column: number, row: number): boolean {
    return (
      isQueenPlacedAt(this.position.queens, column, row) ||
      this.isQueenPlacedByUserAt(column, row)
    );
  }

  isQueenPlacedByUserAt(column: number, row: number): boolean {
    return isQueenPlacedAt(this.position.userQueens, column, row);
  }

  isVisited(column: number, row: number): boolean {
    const visited = this.position.visited;
    if (!visited.hasOwnProperty(column)) {
      return false;
    }
    return visited[column].hasOwnProperty(row);
  }

  findEmptyColumn(): number {
    for (let column = 0; column < this.getSize(); column++) {
      if (!this.isColumnTaken(column)) {
        return column;
      }
    }
    return -1;
  }

  getSize(): number {
    return this.position.queens.length;
  }

  conflictsAt(column: number, row: number): number {
    return (
      conflictsAt(this.position.queens, column, row) +
      conflictsAt(this.position.userQueens, column, row)
    );
  }

  withQueen(column: number, row: number): PositionBuilder {
    let newQueens = this.position.queens.slice();
    newQueens[column] = row;
    return PositionBuilder.fromPosition({
      ...this.position,
      queens: newQueens,
    });
  }

  withUserQueenToggled(column: number, row: number): PositionBuilder {
    let newQueens = this.position.userQueens.slice();
    if (newQueens[column] === row) {
      newQueens[column] = FREE_SQUARE;
    } else {
      newQueens[column] = row;
    }
    return PositionBuilder.fromPosition({
      ...this.position,
      userQueens: newQueens,
    });
  }

  withoutQueen(column: number): PositionBuilder {
    const row = this.getQueenAt(column);
    const newQueens = this.position.queens.slice();
    newQueens[column] = FREE_SQUARE;
    const newVisited = clone(this.position.visited);
    if (!newVisited.hasOwnProperty(column)) {
      newVisited[column] = {};
    } else {
      newVisited[column] = clone(newVisited[column]);
    }
    newVisited[column][row] = true;
    return PositionBuilder.fromPosition({
      ...this.position,
      queens: newQueens,
      visited: newVisited,
    });
  }

  withFocusedColumn(column: number): PositionBuilder {
    return PositionBuilder.fromPosition({
      ...this.position,
      focusedColumn: column,
    });
  }

  withText(column: number, row: number, text: string): PositionBuilder {
    const newText = clone(this.position.text);
    if (!newText.hasOwnProperty(column)) {
      newText[column] = {};
    } else {
      newText[column] = clone(newText[column]);
    }
    newText[column][row] = text;
    return PositionBuilder.fromPosition({
      ...this.position,
      text: newText,
    });
  }

  withNoText(): PositionBuilder {
    return PositionBuilder.fromPosition({
      ...this.position,
      text: {},
    });
  }

  isSolved(): boolean {
    let size = this.position.queens.length;
    for (let column = 0; column < size; column++) {
      if (!this.isColumnTaken(column)) {
        return false;
      }

      const queenRow = this.getQueenAt(column);
      if (this.conflictsAt(column, queenRow) !== 0) {
        return false;
      }
    }
    return true;
  }

  build(): Position {
    return this.position;
  }
}

function getQueenAt(queens: number[], column: number): number {
  if (column < 0 || column >= queens.length) {
    return FREE_SQUARE;
  }
  return queens[column];
}

function isSafe(queens: number[], column: number, row: number): boolean {
  if (isColumnTaken(queens, column)) {
    return false;
  }

  return queens.every((queenRow: number, columnIndex: number) => {
    if (queenRow === FREE_SQUARE) {
      return true;
    }

    // skip column being queried
    if (columnIndex === column) {
      return true;
    }

    // the formula below does not cover same row cases
    if (queenRow === row) {
      return false;
    }

    return Math.abs(column - columnIndex) !== Math.abs(row - queenRow);
  });
}

function isColumnTaken(queens: number[], column: number): boolean {
  if (column < 0 || column >= queens.length) {
    return false;
  }
  return queens[column] !== FREE_SQUARE;
}

function isQueenPlacedAt(queens: number[], column: number, row: number): boolean {
  if (column < 0 || column >= queens.length) {
    return false;
  }
  return queens[column] === row;
}

function conflictsAt(queens: number[], column: number, row: number): number {
  const reduceFn = (conflicts: number, currentRow: number, currentCol: number) => {
    // skip current column
    if (currentCol === column) {
      return conflicts;
    }

    if (currentRow === FREE_SQUARE) {
      return conflicts;
    }

    // check if the cells have the same row
    if (currentRow === row) {
      return conflicts + 1;
    }

    let diagonalMatch = Math.abs(column - currentCol) === Math.abs(row - currentRow);
    return diagonalMatch ? conflicts + 1 : conflicts;
  };
  return queens.reduce(reduceFn, 0);
}

function fromMatrix(matrix: number[][]) {
  if (matrix.length < 4) {
    throw new Error("Matrix must be at least 4x4.");
  }

  const size = matrix.length;
  let q = [];
  for (let i = 0; i < size; i++) {
    q.push(FREE_SQUARE);
  }

  let userQueens = q.slice();
  for (let column = 0; column < size; column++) {
    for (let row = 0; row < size; row++) {
      if (matrix[row].length !== size) {
        throw new Error("Matrix must be square.");
      }
      if (matrix[row][column] === 0) {
        continue;
      }
      if (q[column] !== FREE_SQUARE) {
        throw new Error("Invalid configuration - multiple queens on same column.");
      }
      q[column] = row;
    }
  }

  return {
    queens: q,
    userQueens: userQueens,
    focusedColumn: -1,
    visited: {}, text: {},
  };
}

function clone(obj: {}) {
  const newObj = {};
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    newObj[key] = obj[key];
  }
  return newObj;
}
