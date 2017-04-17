import {Action, Store} from "redux";
import {StoreState} from "./store";
import {canForwardSelector} from "./selectors";
import Actions, {TOGGLE_PLAYBACK} from "./actions";

export const playbackMiddleware = (store: Store<StoreState>) => {
  let timeoutId = 0;

  function getAnimationSpeed() {
    return store.getState().animationSpeed;
  }

  function isPlaying() {
    return store.getState().isPlaying;
  }

  function canForward() {
    return canForwardSelector(store.getState());
  }

  function stepForward() {
    if (!isPlaying()) {
      timeoutId = 0;
      return;
    }

    schedule();

    if (canForward()) {
      store.dispatch(Actions.playForward());
    } else {
      store.dispatch(Actions.togglePlayback());
    }
  }

  function start() {
    schedule();
  }

  function schedule() {
    timeoutId = window.setTimeout(stepForward, getAnimationSpeed());
  }

  function stop() {
    clearTimeout(timeoutId);
    timeoutId = 0;
  }

  return (next: Function) => {
    return (action: Action) => {
      let result = next(action);
      if (action.type !== TOGGLE_PLAYBACK) {
        return result;
      }

      if (store.getState().isPlaying) {
        start();
      } else {
        stop();
      }

      return result;
    };
  };
};
