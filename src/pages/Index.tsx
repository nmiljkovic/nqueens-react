import * as React from "react";
import {Container, Grid} from "semantic-ui-react";
import {Board, PlacementSidebar, Sidebar} from "../containers";
import {StoreState} from "../store";
import {connect} from "react-redux";

const Index = ({placement}: { placement: boolean }) => (
  <div>
    <Container>
      <Grid>
        <Grid.Column width={16}>
          <h2>NQueens interactive solver</h2>
        </Grid.Column>
      </Grid>
    </Container>
    <Container>
      <Grid columns={2}>
        <Grid.Column width={11}>
          <Board/>
        </Grid.Column>
        <Grid.Column width={5}>
          {placement ? <PlacementSidebar/> : <Sidebar/>}
        </Grid.Column>
      </Grid>
    </Container>
  </div>
);

const mapStateToProps = (state: StoreState) => ({
  placement: state.inPlacement,
});

const IndexPage = connect(mapStateToProps)(Index);
export default IndexPage;
