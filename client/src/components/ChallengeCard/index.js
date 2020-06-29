import React from 'react';
import UpdateChallengeForm from '../UpdateChallenge/UpdateChallengeForm';
import { Row, Col } from '../Grid';
import './ChallengeCard.scss';

const ChallengeCard = (props) => {
  return (
    <>
      {props.myChallenges.length > 0 && (
        <>
          {props.myChallenges.map((challenge, i) => (
            //Challenges created by logged in user
            <div
              className="card text-center areChallenging"
              key={challenge._id}
              style={{ backgroundColor: '#f3faf9' }}>
              <div className="card-body">
                <h5 className="card-title">
                  You Challenged {challenge.challengers[1]}
                </h5>
                <hr></hr>
                <p className="card-text">
                  You challenged {challenge.challengers[1]} to a{' '}
                  {challenge.distance} mile race where the loser donates $
                  {challenge.donatedAmount} to {challenge.businessName}.
                </p>

                {challenge.status === 'pending' && (
                  <>
                    <button
                      href="#"
                      className="btn enterOutcome mr-5"
                      id="update-challenge"
                      data-toggle="modal"
                      data-target={`#updateModal${i}`}
                    >
                      Enter Challenge Outcome
                    </button>
                    <div
                      className="modal fade"
                      id={`updateModal${i}`}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Submit Completed Challenge
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
                            <UpdateChallengeForm
                              id={challenge._id}
                              handleChallenge={props.handleChallenge}
                              challengers={challenge.challengers}
                              time = {challenge.time}
                              business={challenge.businessName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="card-footer text-muted">
                Status: {challenge.status}
              </div>
            </div>
          ))}
        </>
      )}
      {/* challenges were logged in user was challenged */}
      {props.incomingChallenges.length > 0 && (
        <>
          {props.incomingChallenges.map((challenge, i) => (
            <div
              className="card text-center wereChallenged"
              key={challenge._id}>
              <div className="card-body">
                <h5 className="card-title">
                  You Were Challenged By {challenge.challengers[0]}!
                </h5>
                <hr></hr>
                <p className="card-text">
                  {challenge.challengers[0]} challenges you to a{' '}
                  {challenge.distance} mile race. The slower runner donates $
                  {challenge.donatedAmount} to {challenge.businessName}.
                </p>
                {challenge.status === 'pending' ? (
                  <>
                    <button
                      href="#"
                      className="btn enterOutcome mr-5"
                      id="update-challenge"
                      data-toggle="modal"
                      data-target={`#updateModal${i}`}
                    >
                      Enter Challenge Outcome
                    </button>
                    <div
                      className="modal fade"
                      id={`updateModal${i}`}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title text-center">
                              Submit Completed Challenge Details:
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
                            <UpdateChallengeForm
                              id={challenge._id}
                              handleChallenge={props.handleChallenge}
                              challengers={challenge.challengers}
                              time = {challenge.time}
                              business={challenge.businessName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <hr></hr>
                    <Row>
                      <Col size="lg-6 sm-12">
                        <button
                          className="btn accept"
                          onClick={() =>
                            props.handleChallengeChange(challenge._id, 'accept')
                          }
                        >
                          <i className="fa fa-check mr-2" />
                          Accept Challenge
                        </button>
                      </Col>
                      <Col size="lg-6 sm-12">
                        <button
                          className="btn deny"
                          onClick={() =>
                            props.handleChallengeChange(challenge._id, 'deny')
                          }
                        >
                          <i className="fa fa-ban mr-2" />
                          Deny Challenge
                        </button>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
              <div className="card-footer text-muted">
                Status: {challenge.status}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ChallengeCard;
