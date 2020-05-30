import React from "react";
import "./Card.css"

export const Card = (props) => (
  <div className="card mt-5 shadow mb-5 bg-gray rounded" >
    <div className="card-header text-center" >
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
