import React from "react";
import UpdateChallengeForm from "../UpdateChallenge/UpdateChallengeForm";
import { Card } from "../Card";

const ChallengeCard = (props) => {
    return(
        <Card title="My Challenges">
              {props.myChallenges.length && (
                <>
                  { 
                  props.myChallenges.map((challenge, i) => ( 
                    //Challenges created by you
                    <div className="card text-center" key={challenge._id}>
                        <div className="card-body">
                          <h5 className="card-header">You Challenged {challenge.challengers[1]}</h5>
                          <p className="card-text">You challenged {challenge.challengers[1]} to do a {challenge.distance} miles run where the loser needs to donate ${challenge.donatedAmount} to {challenge.businessName}.</p>
                          { (challenge.status === "pending") && (
                            <>
                            <button href="#" className="btn accept mr-5" id="update-challenge" data-toggle="modal" data-target={`#updateModal${i}`} >Enter Challenge Outcome</button>
                            <div className="modal fade" id={`updateModal${i}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Submit Completed Challenge</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <UpdateChallengeForm id={challenge._id} handleChallenge={props.handleChallenge} />
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
              {props.incomingChallenges.length && (
                <>
                  {
                    props.incomingChallenges.map((challenge,i) => (
                        <div className="card text-center">
                        <div className="card-body">
                          <h5 className="card-header">You Were Challenged By {challenge.challengers[0]}</h5>
                          <p className="card-text">{challenge.challengers[0]} challenges you to do a {challenge.distance} miles race. The slower runner donates ${challenge.donatedAmount} to {challenge.businessName}.</p>
                          {(challenge.status === "pending") ? (
                            <>
                              <button href="#" className="btn accept mr-5" id="update-challenge" data-toggle="modal" data-target={`#updateModal${i}`} >Enter Challenge Outcome</button>
                              <div className="modal fade" id={`updateModal${i}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Complete & submit challenge details below:</h5>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <UpdateChallengeForm id={challenge._id} handleChallenge={props.handleChallenge} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ):(   
                            <>
                              <button className="btn accept mr-5" onClick={() => props.handleChallengeChange(challenge._id,"accept")}>Accept Challenge</button><button className="btn deny" onClick={() => props.handleChallengeChange(challenge._id,"deny")}>Deny Challenge</button>
                            </>
                          )}
                          </div>
                        {/* either render actual time or kick out
                        <div className="card-footer text-muted">
                            2 days ago
                        </div> */}
                      </div>
                    ))
                  }
                </>
              )}
            </Card>
    );
}

export default ChallengeCard;