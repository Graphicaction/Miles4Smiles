import React from "react";
import { Card, Container, Grid} from "@material-ui/core";

const NoMatch = () => (
  <Container fluid>
    <Grid spacing={3} justify="center">
      <Grid item component={Card} xs={12} md={6} className="card">
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        </Grid>
      </Grid>
  </Container>
);

export default NoMatch;
