import React from "react";
import "./UserCard.css"
import RunningStats from "../../pages/RunningStats/RunningStats";


const UserCard =() => {
  return(
    <>
    <div className="card" style={{width: "18rem"}}>
      <div className="card-body ">
        <h5 className="card-title justify-content-center">Username</h5>
        <h6 className="card-subtitle mb-2 text-muted"><i className="fa fa-location"></i>Location</h6>
        <hr></hr>
        <p className="card-text pace">Average mile pace: xx</p>
        <p className="card-text distance">Preferred distance: xx</p>
        <hr></hr>
        <button className="btn card-link challengeBtn"><i className="fa fa-flag-checkered mr-2"></i>Challenge</button>
        <button className="btn btn-light card-link ml-3"><i className="fa fa-envelope mr-2"></i>Contact</button>
      </div>
    </div>
    
    <RunningStats />
    </>
  )
}

export default UserCard;
