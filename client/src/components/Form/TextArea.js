import React from "react";
import { FormGroup, FormControl, TextareaAutosize } from "@material-ui/core";

export const TextArea = props => (
  <div item component={ FormGroup }>
    <TextareaAutosize aria-label="text" placeholder="Text" item Component={FormControl} rowsMin={5} {...props} />
  </div>
);


