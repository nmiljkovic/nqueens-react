import * as React from "react";
import {Button} from "semantic-ui-react";
import {range} from "../utils";

interface BoardSizeProps {
  currentSize: number;
  onChangeSize: Function;
}

const BoardSize = ({currentSize, onChangeSize}: BoardSizeProps) => (
  <Button.Group fluid={true} size="small" color="blue">
    {range(4, 11).map(size => {
      const active = size === currentSize;
      return (
        <Button key={size}
                active={active}
                onClick={onChangeSize.bind(null, size)}>
          {size}
        </Button>
      );
    })}
  </Button.Group>
);

export default BoardSize;
