import {Position} from "./position";

export interface Solution {
  solved: boolean;
  steps: Position[];
}

export interface Solver {
  (position: Position): Solution;
}