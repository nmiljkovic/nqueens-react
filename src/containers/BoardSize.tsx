import {connect} from "react-redux";
import BoardSizeView from "../components/BoardSize";
import {StoreState} from "../store";
import Actions from "../actions";

const mapState = (state: StoreState) => ({
  currentSize: state.position.queens.length,
});

const mapDispatch = {
  onChangeSize: Actions.changeSize,
};

const BoardSize = connect(mapState, mapDispatch)(BoardSizeView);
export default BoardSize;
