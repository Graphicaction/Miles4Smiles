import React, {useContext, useState} from "react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Jdenticon from "react-jdenticon";
import UserContext from "../../utils/UserContext";
import ChallengeModal from "../ChallengeModal/ChallengeModal";
import Carousel from 'react-bootstrap/Carousel';
import "./UserCard.scss"
// import 'bootstrap/dist/css/bootstrap.min.css'

import {Col} from "../Grid"


const UserCard =() => {
  const { user, users } = useContext(UserContext);
  const [index, setIndex] = useState();

  const currentUser = user._id;

  //Options for alert messages
  const options = {
    position: positions.TOP_CENTER,
    timeout: 2500,
    offset: '30px',
    transition: transitions.SCALE
  }
  // later add that only users if their pace match
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let usersToRender;
  if (users) {
    // let display4usersOnly = users.slice(0, 5);
    let display4usersOnly = users;

  return(
    <>
    <Carousel activeIndex={index} onSelect={handleSelect} keyboard={true} nextLabel={"Next"} prevLabel={"Previous"} touch={true} >
     {display4usersOnly.map((user, index) => ( user._id !== currentUser && (
      <Carousel.Item key={index} className="col-lg-3 col-md-4 col-sm-12 " data-slide={index}>
          <div className= "card text-center d-block mx-auto">
           <div className="card-body">
            <Jdenticon className="avatar" size="48" value={user.username} float="right"></Jdenticon>
            <h5  className="card-title justify-content-center">{user.username}</h5>
            <h6  className="card-subtitle mb-2 text-muted"><i className="fa fa-location"></i>{user.city}, {user.state} </h6>
            <hr></hr>
            <p  className="card-text pace">Average Pace: {user.averagePace} /mile</p>
            <p  className="card-text distance">Preferred Distance: {user.averageDistance} miles</p>
            <hr></hr>
            <AlertProvider template={AlertTemplate} {...options}>
              <ChallengeModal name={user.username} />
            </AlertProvider>
          </div>
        </div>
      </Carousel.Item>
      )))}
      
    </Carousel>

   </>
    )
  } else {
    usersToRender ="Loading..."
  }
  return <>{usersToRender}</>
}

export default UserCard;
