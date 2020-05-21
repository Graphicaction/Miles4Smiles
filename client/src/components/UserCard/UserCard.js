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
        <a href="/challenge" className="btn btn-danger card-link">Challenge</a>
        <a href="#" className="btn btn-light card-link">Contact</a>
      </div>
    </div>
    
    <RunningStats />
    </>
  )
}

export default UserCard;
