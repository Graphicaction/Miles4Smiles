import React from 'react';
import LossCard from './LossCard';

function ViewLosses(props) {
  return (
    <>
      <div className="row">
        <div className="col-12 text-center justify-content-center">
          {props.losses.map((loss, i) => (
            <div key={loss._id}>
              <LossCard
                loss={loss}
                id={loss._id}
                handleChallenge={props.handleChallenge}
              />
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
