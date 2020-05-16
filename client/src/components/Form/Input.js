import React from "react";
import { FormGroup, FormControl } from "@material-ui/core";


export const Input = props => (
  <div component={ FormGroup }>
    <input component={ FormControl} {...props} />
  </div>
);