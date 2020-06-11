import React, { useContext } from 'react';
import Jdenticon from 'react-jdenticon';
import UserContext from '../../utils/UserContext';
import ChallengeModal from '../ChallengeModal/ChallengeModal';
import './UserCard.scss';

const UserCard = () => {
  const { user, users } = useContext(UserContext);
  const currentUser = user._id;

  const handleScrollLeft = () => {
    scrollLeft(document.getElementById('animate-scroll'), -400, 1000);
  };

  const handleScrollRight = () => {
    scrollLeft(document.getElementById('animate-scroll'), 400, 1000);
  };
  // Adding scroll for cards
  const scrollLeft = (element, change, duration) => {
    let start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    let animateScroll = function () {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  if (users) {
    let minPace, maxPace;
    maxPace = parseInt(user.averagePace) + 1;
    minPace = parseInt(user.averagePace) - 1;
    const similarPaceUsers = [],
      otherUsers = [];
    //Getting data to display the users with similar pace first and then other users
    users.forEach((challenger) => {
      if (challenger._id !== currentUser) {
        const avgPace = parseInt(challenger.averagePace);
        if (avgPace >= minPace && avgPace <= maxPace)
          similarPaceUsers.push(challenger);
        else if(avgPace !== 0)
          otherUsers.push(challenger);
      }
    });

    const allUserCards = [];
    similarPaceUsers.forEach((user) => {
      allUserCards.push(user);
    });
    otherUsers.forEach((user) => {
      allUserCards.push(user);
    });

    return (
      <>
        <div className="row fluid">
          <div
            className={`flex-container flex py-2 ${
              allUserCards.length < 4 ? 'justify-content-center' : ''
            }`}
            id="animate-scroll"
          >
            {/* <div className="d-flex flex-row flex-nowrap"> */}
            {similarPaceUsers.map((user, index) => (
              <div
                className="card col-lg-3 col-md-4 col-sm-6 text-center flex-item samePaceUser"
                key={user._id}
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
            ))}
            {otherUsers.map((user, index) => (
              <div
                className="card col-lg-3 col-md-4 col-sm-6 text-center flex-item"
                key={user._id}
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
            ))}
          </div>
        </div>
        <div className="row fluid justify-content-center">
          <button
            className={`btn chevronBtn ${
              allUserCards.length < 4 ? 'bounce-left' : ''
            }`}
            onClick={handleScrollLeft}
          >
            <i className=" fa fa-chevron-left m-2" />{' '}
          </button>
          <button
            className={`btn chevronBtn ${
              allUserCards.length < 4 ? 'bounce-right' : ''
            }`}
            onClick={handleScrollRight}
          >
            <i className=" fa fa-chevron-right m-2" />{' '}
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h5 className="text-center">No other users found</h5>
      </div>
    );
  }
};

export default UserCard;
