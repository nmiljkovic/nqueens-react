import PositionBuilder from "./simulation/position";
import {StoreState} from "./store";
import {
  BACKWARD,
  CHANGE_ALGORITHM,
  CHANGE_ANIMATION_SPEED,
  CHANGE_SIZE,
  CHANGE_VISUAL_OPTIONS,
  FAST_BACKWARD,
  FAST_FORWARD,
  FORWARD,
  PLACE_QUEEN,
  PLAY_FORWARD,
  TOGGLE_PLACEMENT,
  TOGGLE_PLAYBACK
} from "./actions";
import {lastStepIndexSelector} from "./selectors";

const initialState: StoreState = {
  position: PositionBuilder.createEmpty(6).build(),
  stepIndex: 0,
  animationSpeed: 500,
  algorithm: "dfs",
  isPlaying: false,
  inPlacement: false,
  visualOptions: {
    fade: true,
    showUnsafe: true,
    showVisited: true,
  },
};

const stopPlayingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FORWARD:
    case BACKWARD:
    case FAST_FORWARD:
    case FAST_BACKWARD:
    case CHANGE_SIZE:
    case CHANGE_ALGORITHM:
      return {...state, isPlaying: false};
    default:
      return state;
  }
};

const reducer = (state = initialState, action: any) => {
  state = stopPlayingReducer(state, action);
  switch (action.type) {
    case PLAY_FORWARD:
    case FORWARD:
      return {
        ...state,
        stepIndex: state.stepIndex + 1,
      };
    case BACKWARD:
      return {
        ...state,
        stepIndex: state.stepIndex - 1,
      };
    case FAST_BACKWARD:
      return {
        ...state,
        stepIndex: 0,
      };
    case FAST_FORWARD:
      return {
        ...state,
        stepIndex: lastStepIndexSelector(state),
      };
    case TOGGLE_PLAYBACK:
      return {...state, isPlaying: !state.isPlaying};
    case TOGGLE_PLACEMENT:
      return {
        ...state,
        inPlacement: !state.inPlacement,
      };
    case CHANGE_SIZE:
      return {
        ...state,
        position: PositionBuilder
          .createEmpty(action.size)
          .build(),
        stepIndex: 0,
      };
    case CHANGE_ANIMATION_SPEED:
      return {
        ...state,
        animationSpeed: action.animationSpeed as number,
      };
    case CHANGE_ALGORITHM:
      return {
        ...state,
        algorithm: action.algorithm as string,
        stepIndex: 0,
      };
    case PLACE_QUEEN:
      if (!state.inPlacement) {
        return state;
      }
      const pos = PositionBuilder.fromPosition(state.position);
      // Only allow placing queens on safe squares.
      // If the square is unsafe, it can be toggled if a user queen is
      // placed there.
      if (!pos.isSafe(action.column, action.row) &&
        !pos.isQueenPlacedByUserAt(action.column, action.row)) {
        return state;
      }
      return {
        ...state,
        position: pos
          .withUserQueenToggled(action.column, action.row)
          .build(),
        stepIndex: 0,
      };
    case CHANGE_VISUAL_OPTIONS:
      return {
        ...state,
        visualOptions: {
          ...state.visualOptions,
          ...action.opts,
        },
      };
    default:
      return state;
  }
};

export default reducer;
