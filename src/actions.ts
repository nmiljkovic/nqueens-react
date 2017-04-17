export const FORWARD = "FORWARD";
export const BACKWARD = "BACKWARD";
export const FAST_FORWARD = "FAST_FORWARD";
export const FAST_BACKWARD = "FAST_BACKWARD";
export const PLAY_FORWARD = "PLAY_FORWARD";
export const TOGGLE_PLAYBACK = "TOGGLE_PLAYBACK";
export const TOGGLE_PLACEMENT = "TOGGLE_PLACEMENT";
export const CHANGE_SIZE = "CHANGE_SIZE";
export const CHANGE_ANIMATION_SPEED = "CHANGE_ANIMATION_SPEED";
export const CHANGE_ALGORITHM = "CHANGE_ALGORITHM";
export const CHANGE_VISUAL_OPTIONS = "CHANGE_VISUAL_OPTIONS";
export const PLACE_QUEEN = "PLACE_QUEEN";

const Actions = {
  forward: () => ({type: FORWARD}),
  backward: () => ({type: BACKWARD}),
  fastForward: () => ({type: FAST_FORWARD}),
  fastBackward: () => ({type: FAST_BACKWARD}),
  playForward: () => ({type: PLAY_FORWARD}),
  togglePlayback: () => ({type: TOGGLE_PLAYBACK}),
  togglePlacement: () => ({type: TOGGLE_PLACEMENT}),
  changeSize: (size: number) => ({
    type: CHANGE_SIZE,
    size,
  }),
  changeAnimationSpeed: (animationSpeed: number) => ({
    type: CHANGE_ANIMATION_SPEED,
    animationSpeed,
  }),
  changeAlgorithm: (algorithm: string) => ({
    type: CHANGE_ALGORITHM,
    algorithm,
  }),
  changeVisualOptions: (opts: any) => ({
    type: CHANGE_VISUAL_OPTIONS,
    opts,
  }),
  onPlaceQueen: (column: number, row: number) => ({
    type: PLACE_QUEEN,
    column, row,
  }),
};

export default Actions;
