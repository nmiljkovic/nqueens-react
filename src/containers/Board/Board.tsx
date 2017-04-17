import {connect} from "react-redux";
import BoardView from "../../components/Board/Board";
import {StoreState} from "../../store";
import {focusedColumnSelector} from "../../selectors";
import Actions from "../../actions";
import {boardSquaresSelector} from "./selectors";

const mapState = (state: StoreState) => ({
  size: state.position.queens.length,
  squares: boardSquaresSelector(state),
  focusedColumn: focusedColumnSelector(state),
  fadeSquares: state.visualOptions.fade,
  showVisited: state.visualOptions.showVisited,
  showUnsafe: state.visualOptions.showUnsafe,
  inPlacement: state.inPlacement,
});

const mapDispatch = {
  onPlaceQueen: Actions.onPlaceQueen,
};

const Board = connect(mapState, mapDispatch)(BoardView);
export default Board;
