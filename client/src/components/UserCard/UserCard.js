import React from "react";
import "./UserCard.css"


const UserCard =() => {
  return(
    <>
    <div className="card" style={{width: "18rem"}}>
      <div className="card-body ">
        <h5 className="card-title justify-content-center">Username</h5>
        <h6 className="card-subtitle mb-2 text-muted"><i className="fa fa-location"></i>Location</h6>
        <hr></hr>
        <p className="card-text pace">I run a mile in xx minutes.</p>
        <p className="card-text distance">I prefer to run between xx miles.</p>
        <hr></hr>
        <a href="#" className="btn btn-danger card-link">Challenge</a>
        <a href="#" className="btn btn-light card-link">Contact</a>
      </div>
    </div>
    </>
  )
}

export default UserCard;
