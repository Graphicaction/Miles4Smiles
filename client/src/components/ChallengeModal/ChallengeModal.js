import React from "react";
import ChallengeForm from "../../components/ChallengeForm/ChallengeForm";


function ChallengeModal(props) {
  return (
    <>
    {(props.name) ? (
      <>
        <button type="button" className="btn start-challenge" data-toggle="modal" data-target={`#exampleModal${props.name}`}><i className ="fa fa-flag-checkered mr-2"/>Challenge a User!</button>
          <div className="modal fade" id={`exampleModal${props.name}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create a challenge to support your favorite local business!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ChallengeForm handleChallenge={props.handleChallenge} name={props.name} />
              </div>
            </div>
          </div>
        </div>
    </>
    ):(
    <>
      <button type="button" className="btn start-challenge" data-toggle="modal" data-target="#challengeModal"><i className="fa fa-flag-checkered mr-2"/>Challenge User</button>
        <div className="modal fade" id="challengeModal" tabIndex="-1" role="dialog" aria-labelledby="challengeModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create a challenge to support your favorite local business!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ChallengeForm handleChallenge={props.handleChallenge} getChallenges={props.loadChallenges}/>
              </div>
            </div>
          </div>
        </div>
    </>
    )}
    </>
  );
}

export default ChallengeModal