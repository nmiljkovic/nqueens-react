import * as React from "react";
import {Grid} from "semantic-ui-react";
import QueenPlacement from "../QueenPlacement";

const PlacementSidebar = () => (
  <Grid>
    <Grid.Column>
      <QueenPlacement/>
    </Grid.Column>
  </Grid>
);

export default PlacementSidebar;
