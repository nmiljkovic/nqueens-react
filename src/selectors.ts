import {createSelector} from "reselect";
import {StoreState} from "./store";
import {Position} from "./simulation/position";
import {Solution} from "./simulation/solver";
import DepthFirstSearch from "./simulation/dfs";
import HillClimbing from "./simulation/hillclimbing";
import MinConflict from "./simulation/minconflict";

export const solutionSelector = createSelector(
  (state: StoreState) => state.algorithm,
  (state: StoreState) => state.position,
  (algorithm: string, pos: Position): Solution => {
    switch (algorithm) {
      case "dfs":
        return DepthFirstSearch(pos);
      case "hillclimbing":
        return HillClimbing(pos);
      case "minconflict":
        return MinConflict(pos);
      default:
        return DepthFirstSearch(pos);
    }
  },
);

export const stepIndexSelector = createSelector(
  (state: StoreState) => state.stepIndex,
  (stepIndex: number) => stepIndex,
);

export const currentPositionSelector = createSelector(
  solutionSelector,
  stepIndexSelector,
  (state: StoreState) => state.inPlacement,
  (solution: Solution, stepIndex: number, placement: boolean): Position => {
    if (placement) {
      return solution.steps[0];
    }
    return solution.steps[stepIndex];
  },
);

export const canForwardSelector = createSelector(
  solutionSelector,
  stepIndexSelector,
  (solution: Solution, stepIndex: number) => (
    stepIndex < solution.steps.length - 1
  ),
);

export const canBackwardSelector = createSelector(
  stepIndexSelector,
  (stepIndex: number) => (
    stepIndex > 0
  ),
);

export const lastStepIndexSelector = createSelector(
  solutionSelector,
  (solution: Solution) => solution.steps.length - 1,
);

export const focusedColumnSelector = createSelector(
  currentPositionSelector,
  (pos: Position) => pos.focusedColumn,
);

export const progressSelector = createSelector(
  solutionSelector,
  stepIndexSelector,
  (solution: Solution, stepIndex: number): number => (
    stepIndex / (solution.steps.length - 1) * 100
  ),
);
