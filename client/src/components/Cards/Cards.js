import React from "react";
import { Card, CardContent, Typography, Grid} from "@material-ui/core";

export const Cards = (props) => (
  <>
      <Grid container spacing={2} justify-content="center">
        <Grid item component={Card} xs={12} md={12} >
          <CardContent>
            <div>
            <Typography component={'span'} variant="h5">{props.title}</Typography>
            </div>
            <div>
            <Typography component={'span'} color="textSecondary">{props.children}</Typography>
            </div>
          </CardContent>
        </Grid>
      </Grid>
  </>
);

