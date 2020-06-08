import React, { useState, useContext, useEffect } from 'react';
import API from '../../utils/API';
import LossCard from './LossCard';

function ViewLosses(props) {
  const losses = props.losses;
  return (
    <>
      <div className="row">
        <div className="col-12 text-center justify-content-center">
          {props.losses.map((loss, i) => (
            <div key={loss._id}>
              <LossCard loss={loss} id={loss._id} handleChallenge={props.handleChallenge}/>
              <hr></hr>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default ViewLosses;
