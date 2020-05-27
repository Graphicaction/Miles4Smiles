import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ float: "right", marginBottom: 10 }} data-dismiss="modal" className="btn btn-secondary">
    {props.children}
  </button>
);
