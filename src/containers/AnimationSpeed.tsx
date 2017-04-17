import {connect} from "react-redux";
import AnimationSpeedView from "../components/AnimationSpeed";
import {StoreState} from "../store";
import Actions from "../actions";

const animationSpeeds = [
  {
    label: "Slow",
    speed: 1000
  },
  {
    label: "Normal",
    speed: 500
  },
  {
    label: "Fast",
    speed: 250
  },
  {
    label: "Very fast",
    speed: 100
  },
];

const mapState = (state: StoreState) => ({
  speeds: animationSpeeds,
  currentSpeed: state.animationSpeed,
});

const mapDispatch = {
  onChangeSpeed: Actions.changeAnimationSpeed,
};

const AnimationSpeed = connect(mapState, mapDispatch)(AnimationSpeedView);
export default AnimationSpeed;
