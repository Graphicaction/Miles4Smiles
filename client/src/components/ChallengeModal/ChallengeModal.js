import React, {useState } from 'react';
import ChallengeForm from '../../components/ChallengeForm/ChallengeForm';

//Modal that includes the Challenge Form and is nested in Runningstats.js and Usercard.js
function ChallengeModal(props) {
  const [challengeReadyState, setChallengeReadyState] = useState();
  //Brief timeout to initialize Google Maps script for Challenge Form
  const setChallengeReady = () => {
    setTimeout(() => {
      setChallengeReadyState('true');
    }, 550)
  }

  return (
    <>
      {props.name ? (
        <>
          <button
            type="button"
            className="btn start-challenge"
            data-toggle="modal"
            onClick={setChallengeReady}
            data-target={`#exampleModal${props.name}`}
          >
            <i className="fa fa-flag-checkered mr-2" />
            Challenge User!
          </button>
          <div
            className="modal fade"
            id={`exampleModal${props.name}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Create a challenge to support your favorite local business!
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  { challengeReadyState ? <ChallengeForm name={props.name}/> : (<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>) }
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            className="btn start-challenge"
            data-toggle="modal"
            data-target="#challengeModal"
            onClick={setChallengeReady}
          >
            <i className="fa fa-flag-checkered mr-2" />
            Challenge User
          </button>
          <div
            className="modal fade"
            id="challengeModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="challengeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Create a challenge to support your favorite local business!
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  { challengeReadyState ?  <ChallengeForm  
                    handleChallenge={props.handleChallenge}
                  /> : (<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>) }
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChallengeModal;
