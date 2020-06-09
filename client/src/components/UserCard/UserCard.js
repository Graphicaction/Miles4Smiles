import React, { useContext, useState } from 'react';
import Jdenticon from 'react-jdenticon';
import UserContext from '../../utils/UserContext';
import ChallengeModal from '../ChallengeModal/ChallengeModal';
import { useAlert } from 'react-alert';
// import Carousel from 'react-bootstrap/Carousel';
import './UserCard.scss';

const UserCard = () => {
  const { user, users } = useContext(UserContext);
  // const [index, setIndex] = useState();
  const alert = useAlert();
  const currentUser = user._id;

  // later add that only users if their pace match
  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  let usersToRender;

  if (users) {
    let minPace, maxPace;
    maxPace = parseInt(user.averagePace) + 1;
    minPace = parseInt(user.averagePace) - 1;
    const similarPaceUsers = [],
      otherUsers = [];
    users.map((challenger) => {
      if (challenger._id != currentUser) {
        const avgPace = parseInt(challenger.averagePace);
        if (avgPace >= minPace && avgPace <= maxPace)
          similarPaceUsers.push(challenger);
        else otherUsers.push(challenger);
      }
    });
    //    while(user.length > 0){
    //         chunks.push(user.splice(0, 3))};
    //         chunks.map()

    return (
      <>
        {/* <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          keyboard={true}
          nextLabel={'Next'}
          prevLabel={'Previous'}
          touch={true}
          slide={false}
          data-interval={false}
          className="d-flex justify-content-center row"
        > */}

        <div className="flex-container flex py-2">
          {/* <div className="d-flex flex-row flex-nowrap"> */}
          {similarPaceUsers.map((user, index) => (
            // <Carousel.Item
            //   key={index}
            //   className="col-lg-3 col-md-4 col-sm-12 "
            //   // data-slide={index}
            // >
            <div
              key={index}
              className="card usercard d-flex col-lg-3 col-md-4 col-sm-10 text-center flex-item "
            >
              <div className="card-body">
                <Jdenticon
                  className="avatar"
                  size="48"
                  value={user.username}
                  float="right"
                ></Jdenticon>
                <h5 className="card-title justify-content-center">
                  {user.username}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <i className="fa fa-location"></i>
                  {user.city}, {user.state}{' '}
                </h6>
                <hr></hr>
                <p className="card-text pace">
                  Average Pace: {user.averagePace} /mile
                </p>
                <p className="card-text distance">
                  Preferred Distance: {user.averageDistance} miles
                </p>
                <hr></hr>
                <ChallengeModal name={user.username} />
              </div>
            </div>
            // {/* </Carousel.Item> */}
          ))}
          {otherUsers.map((user, index) => (
            // <Carousel.Item
            //   key={index}
            //   className="col-lg-3 col-md-4 col-sm-12 "
            //   // data-slide={index}
            // >
            <div
              key={index}
              className="card usercard col-lg-3 col-md-4 col-sm-12 text-center flex-item "
            >
              <div className="card-body">
                <Jdenticon
                  className="avatar"
                  size="48"
                  value={user.username}
                  float="right"
                ></Jdenticon>
                <h5 className="card-title justify-content-center">
                  {user.username}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <i className="fa fa-location"></i>
                  {user.city}, {user.state}{' '}
                </h6>
                <hr></hr>
                <p className="card-text pace">
                  Average Pace: {user.averagePace} /mile
                </p>
                <p className="card-text distance">
                  Preferred Distance: {user.averageDistance} miles
                </p>
                <hr></hr>
                <ChallengeModal name={user.username} />
              </div>
            </div>
            // {/* </Carousel.Item> */}
          ))}
          {/* </Carousel> */}
        </div>
      </>
    );
  } else {
    // usersToRender = 'Loading...';
    return (
      <div>
        <h1>No other users found</h1>
      </div>
    );
  }
  return <>{usersToRender}</>;
};

export default UserCard;
