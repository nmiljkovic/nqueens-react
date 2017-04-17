import {Position} from "./simulation/position";

export interface StoreState {
  position: Position;
  stepIndex: number;
  animationSpeed: number;
  algorithm: string;
  isPlaying: boolean;
  inPlacement: boolean;
  visualOptions: {
    fade: boolean;
    showUnsafe: boolean;
    showVisited: boolean;
  };
}
