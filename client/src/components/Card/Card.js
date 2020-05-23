import React from "react";
import "./Card.css"

export const Card = (props) => (
  <div className="card mt-5" style={{ maxHeight: 770, backgroundColor: '#f8f9f8' }}>
    <div className="card-header text-center" style={{backgroundColor: "#d6947a", color: 'black'}}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);
