import * as React from "react";
import {Checkbox, Form} from "semantic-ui-react";

interface VisualOptionsProps {
  fade: boolean;
  showUnsafe: boolean;
  showVisited: boolean;

  onChangeFade: any;
  onChangeUnsafe: any;
  onChangeVisited: any;
}

const VisualOptions = (props: VisualOptionsProps) => (
  <Form>
    <Form.Field>
      <Checkbox label="Fade squares"
                onChange={props.onChangeFade.bind(null, !props.fade)}
                checked={props.fade}/>
    </Form.Field>
    <Form.Field>
      <Checkbox label="Show unsafe squares"
                onChange={props.onChangeUnsafe.bind(null, !props.showUnsafe)}
                checked={props.showUnsafe}/>
    </Form.Field>
    <Form.Field>
      <Checkbox label="Show visited squares"
                onChange={props.onChangeVisited.bind(null, !props.showVisited)}
                checked={props.showVisited}/>
    </Form.Field>
  </Form>
);

export default VisualOptions;
