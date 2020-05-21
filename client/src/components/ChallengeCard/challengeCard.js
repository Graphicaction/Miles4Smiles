import React from "react";

export const ChallengeCard = (props) => (
  <div className="card mt-5" style={{ maxHeight: 770, backgroundColor: '#f8f9f8' }}>
    <div className="card-header bg-info" style={{color: '#fff'}}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);