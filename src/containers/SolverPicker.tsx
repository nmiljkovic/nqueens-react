import * as React from "react";
import {Select} from "semantic-ui-react";
import {connect} from "react-redux";
import Actions from "../actions";
import {StoreState} from "../store";

interface SolverEntry {
  value: string;
  text: string;
}

interface SolverPickerProps {
  solvers: SolverEntry[];
  algorithm: string;
  onChangeAlgorithm: any;
}

const SolverPickerView = (props: SolverPickerProps) => (
  <Select fluid={true}
          options={props.solvers}
          value={props.algorithm}
          onChange={props.onChangeAlgorithm}/>
);

const solvers = [
  {
    value: "dfs",
    text: "Depth First Search",
  },
  {
    value: "hillclimbing",
    text: "Hill Climbing",
  },
  {
    value: "minconflict",
    text: "Min Conflict",
  },
];

const mapState = (state: StoreState) => ({
  solvers: solvers,
  algorithm: state.algorithm,
});

const mapDispatch = (dispatch: Function) => ({
  onChangeAlgorithm: (e: any, {value}: { value: string }) => {
    dispatch(Actions.changeAlgorithm(value));
  }
});

const SolverPicker = connect(mapState, mapDispatch)(SolverPickerView);
export default SolverPicker;
