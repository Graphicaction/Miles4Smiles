import React, {useContext} from "react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import "./UserCard.scss"
import Jdenticon from "react-jdenticon";
import UserContext from "../../utils/UserContext";
import ChallengeModal from "../ChallengeModal/ChallengeModal";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css'

const UserCard =() => {
  const { user, users } = useContext(UserContext);
  const currentUser = user._id;

  //Options for alert messages
  const options = {
    position: positions.TOP_CENTER,
    timeout: 2500,
    offset: '30px',
    transition: transitions.SCALE
  }
  // later add that only users if their pace match
 
  let usersToRender;
  if (users) {
    let display4usersOnly = users.slice(0, 5);
  return(
    <>
    {/* <CarouselProvider */}
  {/* //   naturalSlideWidth={33}
  //   naturalSlideHeight={33}
  //   totalSlides={3}
  //   // hasMasterSpinner={true}
  //   // interval={5000}
  //   // touchEnabled={true}
  //   // visibleSlides={4}
  //   // children={}
  //   > */}
  {/* //  <Slider>  */}
  
    {display4usersOnly.map((user, i) => ( user._id !== currentUser && (
    // <Slide index={i}>
    // <div key={i} className="">
      <div key={i} className="card text-center carousel-item col-md-3" data-slide={i}>
        <div className="card-body ">
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
    // </div>
    // </Slide>
    )))}


    {/* </Slider>
    <Dot />
    <ButtonBack><i className="fa fa-chevron-left fa-lg"/></ButtonBack>
    <ButtonNext><i className="fa fa-chevron-right fa-lg"/></ButtonNext>
    </CarouselProvider> */}
   </>
    )
  } else {
    usersToRender ="Loading..."
  }
  return <>{usersToRender}</>
}

export default UserCard;
