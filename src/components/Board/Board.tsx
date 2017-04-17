import * as React from "react";
import * as classnames from "classnames";
import {range} from "../../utils";
import "./board.css";

interface FocusRowProps {
  size: number;
  focusedColumn: number;
}

const FocusRow = (props: FocusRowProps) => {
  return (
    <div className="board-focus-row">
      {range(0, props.size).map(col => {
        const className = classnames("board-focus-square", {
          "focused": col === props.focusedColumn,
        });
        return (
          <div key={col} className={className}/>
        );
      })}
    </div>
  );
};

interface SquareProps {
  square: Square;
  onClick: Function;
}

const Square = (props: SquareProps) => {
  const className = classnames("board-square", {
    "unsafe": !props.square.safe,
    "visited": props.square.visited,
    "queen": props.square.queenPlaced,
    "user-placed": props.square.placedByUser,
  });
  return (
    <div className={className}
         onClick={() => props.onClick()}>
      {props.square.text}
    </div>
  );
};

interface RowProps {
  row: Square[];
  rowIndex: number;
  onPlaceQueen: Function;
}

const Row = (props: RowProps) => (
  <div className="board-row">
    {props.row.map((square, colIndex) => (
      <Square key={colIndex}
              square={square}
              onClick={props.onPlaceQueen.bind(null, colIndex, props.rowIndex)}/>
    ))}
  </div>
);

interface BoardProps {
  size: number;
  squares: Square[][];
  focusedColumn: number;
  fadeSquares: boolean;
  showVisited: boolean;
  showUnsafe: boolean;
  inPlacement: boolean;
  onPlaceQueen: Function;
}

interface Square {
  safe: boolean;
  visited: boolean;
  placedByUser: boolean;
  queenPlaced: boolean;
  text: string;
}

const Board = (props: BoardProps) => {
  const {
    size, squares, focusedColumn,
    fadeSquares, showVisited, showUnsafe,
    inPlacement, onPlaceQueen,
  } = props;
  const className = classnames("board", {
    "fade-squares": fadeSquares,
    "show-unsafe-squares": showUnsafe,
    "show-visited-squares": showVisited,
    "editing": inPlacement,
  });
  return (
    <div className={className}>
      <FocusRow size={size} focusedColumn={focusedColumn}/>
      {range(0, size).map(rowIndex => (
        <Row key={rowIndex}
             row={squares[rowIndex]}
             rowIndex={rowIndex}
             onPlaceQueen={onPlaceQueen}/>
      ))}
    </div>
  );
};

export default Board;
