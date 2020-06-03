import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10, backgroundColor:  "#F7882F"}} data-dismiss="modal" className="btn">
    {props.children}
  </button>
);
