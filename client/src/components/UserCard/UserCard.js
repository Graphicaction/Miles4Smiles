import React, { useContext } from 'react';
import Jdenticon from 'react-jdenticon';
import UserContext from '../../utils/UserContext';
import ChallengeModal from '../ChallengeModal/ChallengeModal';
// import Carousel from 'react-bootstrap/Carousel';
import './UserCard.scss';

const UserCard = () => {
  const { user, users } = useContext(UserContext);
  const currentUser = user._id;

  const handleScrollLeft = () => {
    scrollLeft(document.getElementById('animate-scroll'), -300, 1000);
  };

  const handleScrollRight = () => {
    scrollLeft(document.getElementById('animate-scroll'), 300, 1000);
  };

  const scrollLeft = (element, change, duration) => {
    let start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    console.log(start);

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

  let usersToRender;

  if (users) {
    let minPace, maxPace;
    maxPace = parseInt(user.averagePace) + 1;
    minPace = parseInt(user.averagePace) - 1;
    const similarPaceUsers = [],
      otherUsers = [];
    users.forEach((challenger) => {
      if (challenger._id !== currentUser) {
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

        <div className="row fluid">
          <div className="flex-container flex py-2 " id="animate-scroll">
            {/* <div className="d-flex flex-row flex-nowrap"> */}
            {similarPaceUsers.map((user, index) => (
              // <Carousel.Item
              //   key={index}
              //   className="col-lg-3 col-md-4 col-sm-12 "
              //   // data-slide={index}
              // >
              <div
                className="card col-lg-3 col-md-4 col-sm-12 text-center flex-item"
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
              // {/* </Carousel.Item> */}
            ))}
            {otherUsers.map((user, index) => (
              // <Carousel.Item
              //   key={index}
              //   className="col-lg-3 col-md-4 col-sm-12 "
              //   // data-slide={index}
              // >
              <div
                className="card col-lg-3 col-md-4 col-sm-12 text-center flex-item"
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
              // {/* </Carousel.Item> */}
            ))}
            {/* </Carousel> */}
          </div>
        </div>
        <div className="row fluid justify-content-center">
          <button className="btn float-left" onClick={handleScrollLeft}>
            <i className=" fa fa-chevron-left m-2" />{' '}
          </button>
          <button className="btn float-right" onClick={handleScrollRight}>
            <i className=" fa fa-chevron-right m-2" />{' '}
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1>No other users found</h1>
      </div>
    );
  }
};

export default UserCard;
