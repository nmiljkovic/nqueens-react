import * as React from "react";
import {Grid} from "semantic-ui-react";
import Playback from "../Playback";
import SolutionProgress from "../SolutionProgress";
import BoardSize from "../BoardSize";
import AnimationSpeed from "../AnimationSpeed";
import SolverPicker from "../SolverPicker";
import VisualOptions from "../VisualOptions";
import QueenPlacement from "../QueenPlacement";

const GridWrapper = ({children}: { children?: React.ReactChildren }) => (
  <Grid>
    <Grid.Column>{children}</Grid.Column>
  </Grid>
);

const Sidebar = () => (
  <div>
    <GridWrapper>
      <Playback/>
    </GridWrapper>
    <GridWrapper>
      <SolutionProgress/>
    </GridWrapper>
    <GridWrapper>
      <QueenPlacement/>
    </GridWrapper>
    <GridWrapper>
      <h4>Board size</h4>
      <BoardSize/>
    </GridWrapper>
    <GridWrapper>
      <h4>Animation speed</h4>
      <AnimationSpeed/>
    </GridWrapper>
    <GridWrapper>
      <h4>Solver</h4>
      <SolverPicker/>
    </GridWrapper>
    <GridWrapper>
      <h4>Visual Options</h4>
      <VisualOptions/>
    </GridWrapper>
  </div>
);

export default Sidebar;
