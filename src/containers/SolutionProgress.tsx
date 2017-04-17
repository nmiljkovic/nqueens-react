import * as React from "react";
import {connect} from "react-redux";
import {StoreState} from "../store";
import {Message, Progress} from "semantic-ui-react";
import {progressSelector, solutionSelector} from "../selectors";
import {Solution} from "../simulation/solver";
import {createSelector} from "reselect";

interface SolutionProgressProps {
  progress: number;
  isSolved: boolean;
}

const SolutionProgressView = ({progress, isSolved}: SolutionProgressProps) => (
  <div>
    <Progress color="purple" percent={progress}/>
    {
      !isSolved ? (
        <Message warning={true}>
          <p>
            No solutions were found.
            You can still step through the simulation.
          </p>
        </Message>
      ) : null
    }
  </div>
);

const solvedSelector = createSelector(
  solutionSelector,
  (solution: Solution) => solution.solved,
);

const mapState = (state: StoreState) => ({
  progress: progressSelector(state),
  isSolved: solvedSelector(state),
});

const SolutionProgress = connect(mapState)(SolutionProgressView);
export default SolutionProgress;
