import React, {useContext} from "react";
import "./UserCard.css"
import Jdenticon from "react-jdenticon";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";

const UserCard =(props) => {
  const { user,users } = useContext(UserContext);
  console.log("Context UserCard: ", user);
  console.log(users);


  // later add that only users from certain location

  
  return(
    <>
    
    {/* { users.map((user, i)=> ( */}

    <div className="card text-center">
      <div className="card-body ">
        <Jdenticon className="avatar" size="48" value="test" float="right"></Jdenticon>
        <h5 className="card-title justify-content-center">USERNAME</h5>

        <h6 className="card-subtitle mb-2 text-muted"><i className="fa fa-location"></i>CITY, </h6>
        <hr></hr>
        <p className="card-text pace">Average mile pace: </p>
        <p className="card-text distance">Preferred distance: </p>
        <hr></hr>
        <button className="btn card-link challengeBtn"><i className="fa fa-flag-checkered mr-2"></i>Challenge</button>
        <button className="btn btn-light card-link ml-3"><i className="fa fa-envelope mr-2"></i>Contact</button>
      </div>
    </div>
    {/* ))
} */}
    </>
  )
}

export default UserCard;
