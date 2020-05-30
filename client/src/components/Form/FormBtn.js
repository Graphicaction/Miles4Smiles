import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10, backgroundColor:  "#7abcd6"}} data-dismiss="modal" className="btn">
    {props.children}
  </button>
);
