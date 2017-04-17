import VisualOptionsView from "../components/VisualOptions";
import {connect} from "react-redux";
import {StoreState} from "../store";
import Actions from "../actions";

const mapState = (state: StoreState) => ({
  fade: state.visualOptions.fade,
  showUnsafe: state.visualOptions.showUnsafe,
  showVisited: state.visualOptions.showVisited,
});

const mapDispatch = (dispatch: Function) => ({
  onChangeFade: (fade: boolean) => {
    dispatch(Actions.changeVisualOptions({fade}));
  },
  onChangeUnsafe: (showUnsafe: boolean) => {
    dispatch(Actions.changeVisualOptions({showUnsafe}));
  },
  onChangeVisited: (showVisited: boolean) => {
    dispatch(Actions.changeVisualOptions({showVisited}));
  },
});

const VisualOptions = connect(mapState, mapDispatch)(VisualOptionsView);
export default VisualOptions;
