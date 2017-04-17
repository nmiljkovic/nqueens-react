import * as React from "react";
import {Button, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {StoreState} from "../store";
import Actions from "../actions";

interface QueenPlacementProps {
  placement: boolean;
  onTogglePlacement: any;
}

const QueenPlacementView = (props: QueenPlacementProps) => (
  <div>
    <h4>Queen Placement</h4>
    <p>
      You can manually place queens on the board and the
      algorithm will try and find a solution.
    </p>
    <Button color="blue"
            fluid={true}
            onClick={props.onTogglePlacement}>
      <Icon name="grid layout"/>
      {props.placement ? "Exit" : "Enter"} placement mode
    </Button>
  </div>
);

const mapState = (state: StoreState) => ({
  placement: state.inPlacement,
});

const mapDispatch = {
  onTogglePlacement: Actions.togglePlacement,
};

const QueenPlacement = connect(mapState, mapDispatch)(QueenPlacementView);
export default QueenPlacement;
