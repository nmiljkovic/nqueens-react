import * as React from "react";
import {Button} from "semantic-ui-react";

interface PlaybackProps {
  isPlaying: boolean;
  canBackward: boolean;
  canForward: boolean;

  onFastBackward: any;
  onFastForward: any;
  onBackward: any;
  onForward: any;

  onTogglePlay: any;
}

const Playback = (props: PlaybackProps) => (
  <Button.Group fluid={true}>
    <Button onClick={props.onFastBackward}
            disabled={!props.canBackward}
            icon="fast backward"/>
    <Button onClick={props.onBackward}
            disabled={!props.canBackward}
            icon="backward"/>
    <Button onClick={props.onTogglePlay}
            disabled={!props.canForward}
            icon={props.isPlaying ? "pause" : "play"}/>
    <Button onClick={props.onForward}
            disabled={!props.canForward}
            icon="forward"/>
    <Button onClick={props.onFastForward}
            disabled={!props.canForward}
            icon="fast forward"/>
  </Button.Group>
);

export default Playback;
