import React, {useContext} from "react";
import "./UserCard.css"
import Jdenticon from "react-jdenticon";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";

const UserCard =(props) => {
  const { user } = useContext(UserContext);
  console.log("Context UserCard: ", user);

  // later add that only users from certain location
  // const getUsers =() => {
  //   const users = API.getAllUsers();
  //   console.log(users)
  // }
  // getUsers()


  return(
    <>
    

    <div className="card text-center">
      <div className="card-body ">
        <Jdenticon className="avatar" size="48" value="addIDLater" float="right"></Jdenticon>
        <h5 className="card-title justify-content-center">USERNAME</h5>

        <h6 className="card-subtitle mb-2 text-muted"><i className="fa fa-location"></i>CITY, STATE</h6>
        <hr></hr>
        <p className="card-text pace">Average mile pace: PACE</p>
        <p className="card-text distance">Preferred distance: DISTANCE</p>
        <hr></hr>
        <button className="btn card-link challengeBtn"><i className="fa fa-flag-checkered mr-2"></i>Challenge</button>
        <button className="btn btn-light card-link ml-3"><i className="fa fa-envelope mr-2"></i>Contact</button>
      </div>
    </div>
    
    </>
  )
}

export default UserCard;
