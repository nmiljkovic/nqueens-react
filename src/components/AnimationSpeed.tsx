import * as React from "react";
import {Button} from "semantic-ui-react";

interface SpeedEntry {
  label: string;
  speed: number;
}

interface AnimationSpeedProps {
  speeds: SpeedEntry[];
  currentSpeed: number;
  onChangeSpeed: Function;
}

const AnimationSpeed = (props: AnimationSpeedProps) => (
  <Button.Group fluid={true} size="small">
    {props.speeds.map(entry => {
      const active = entry.speed === props.currentSpeed;
      return (
        <Button key={entry.speed}
                active={active}
                onClick={props.onChangeSpeed.bind(null, entry.speed)}>
          {entry.label}
        </Button>
      );
    })}
  </Button.Group>
);

export default AnimationSpeed;
