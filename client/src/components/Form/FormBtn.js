import React from "react";
import { Button } from "@material-ui/core";


export const FormBtn = props => (
  <Button {...props} style={{ float: "right", marginBottom: 10 }} variant="contained" color="primary">
    {props.children}
  </Button>
);