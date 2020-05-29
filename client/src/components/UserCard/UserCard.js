import React, {useContext} from "react";
import "./UserCard.css"
import Jdenticon from "react-jdenticon";
import UserContext from "../../utils/UserContext";

const UserCard =() => {
  const { user,users } = useContext(UserContext);
  console.log("Context UserCard: ", user);
  console.log(users);


  // later add that only users from certain location
 
  let usersToRender;
  if (users) {
    let display4usersOnly = users.slice(0, 5);
    usersToRender = display4usersOnly.map(user => {
  return(
    <>

    <div key={user.username} className="card text-center">
      <div key={user._id.toString()} className="card-body ">
        <Jdenticon  className="avatar" size="48" value={user.username} float="right"></Jdenticon>
        <h5  className="card-title justify-content-center">{user.username}</h5>

        <h6  className="card-subtitle mb-2 text-muted"><i className="fa fa-location"></i>{user.city}, {user.state} </h6>
        <hr></hr>
        <p  className="card-text pace">Average pace: {user.averagePace} /mile</p>
        <p  className="card-text distance">Preferred distance: {user.averageDistance} miles</p>
        <hr></hr>
        <button  className="btn card-link challengeBtn"><i className="fa fa-flag-checkered mr-2"></i>Challenge</button>
        <button  className="btn btn-light card-link ml-3"><i className="fa fa-envelope mr-2"></i>Contact</button>
      </div>
    </div>
    </>
    )
  });
  } else {
    usersToRender ="Loading..."
  }
  return <>{usersToRender}</>
}

export default UserCard;
