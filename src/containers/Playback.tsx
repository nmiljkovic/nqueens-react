import PlaybackView from "../components/Playback";
import {connect} from "react-redux";
import {StoreState} from "../store";
import {canBackwardSelector, canForwardSelector} from "../selectors";
import Actions from "../actions";

const mapState = (state: StoreState) => ({
  isPlaying: state.isPlaying,
  canBackward: canBackwardSelector(state),
  canForward: canForwardSelector(state),
});

const mapDispatch = {
  onFastBackward: Actions.fastBackward,
  onFastForward: Actions.fastForward,
  onBackward: Actions.backward,
  onForward: Actions.forward,
  onTogglePlay: Actions.togglePlayback,
};

const Playback = connect(mapState, mapDispatch)(PlaybackView);
export default Playback;
