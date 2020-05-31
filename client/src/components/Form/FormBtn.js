import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10, backgroundColor:  "#89b0ae"}} data-dismiss="modal" className="btn">
    {props.children}
  </button>
);
