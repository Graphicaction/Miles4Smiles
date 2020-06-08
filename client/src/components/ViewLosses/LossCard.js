import React, { useState, useContext, useEffect } from 'react';
import API from '../../utils/API';

function LossCard(props) {
  // const handleMarkDonated = (id) => {
  //     // Updates the challenge status to "donated"
  //         API.updateChallenge(id, {status: "donated"})
  //         .then(res => {
  //             console.log("updated to donated")
  //         })
  //         .catch(err => {
  //             console.log(err);
  //         })
  // }

  // const handleMarkDonated = (id) => {
  //     // Updates the challenge status to "donated"
  //         API.updateChallenge(id, {status: "donated"})
  //         .then(res => {
  //             console.log("updated to donated")
  //         })
  //         .catch(err => {
  //             console.log(err);
  //         })
  // }

  return (
    <div className="col-12">
      <div className="card-body">
        {/* <h5 className="card-title">You lost a challenge to {props.loss.challengers[1]}</h5>   */}
        <a
          href={props.loss.businessUrl}
          target="_blank"
          className="btn btn-biz"
          id="update-challenge"
        >
          <i className="fa fa-arrow-right" /> {props.loss.businessName}
        </a>
        <p className="card-text">
          Stop by {props.loss.businessName}'s site to spend $
          {props.loss.donatedAmount} by placing an online order, purchasing a
          giftcard, or even ordering take-out. Show some love and when you're
          done, don't forget to mark this challenge as donated!
        </p>
        <button
          type="button"
          data-target={props.key}
          style={{ backgroundColor: '#89b0ae' }}
          className="btn btn-donated"
          aria-label="Close"
        >
          <i className="fa fa-check-square-o" aria-hidden="true"></i> Mark as
          Donated
        </button>
      </div>
    </div>
  );
}

export default LossCard;
