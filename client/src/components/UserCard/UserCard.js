import React, { useContext, useState } from 'react';
import Jdenticon from 'react-jdenticon';
import UserContext from '../../utils/UserContext';
import ChallengeModal from '../ChallengeModal/ChallengeModal';
import { useAlert } from 'react-alert';
import Carousel from 'react-bootstrap/Carousel';
import './UserCard.scss';

const UserCard = () => {
  const { user, users } = useContext(UserContext);
  const [index, setIndex] = useState();
  const alert = useAlert();
  const currentUser = user._id;

  // later add that only users if their pace match
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let usersToRender;

  if (users) {
    // const chunks=[];
    //    while(user.length > 0){
    //         chunks.push(user.splice(0, 3))};
    //         chunks.map()

    return (
      <>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          keyboard={true}
          nextLabel={'Next'}
          prevLabel={'Previous'}
          touch={true}
          slide={false}
          data-interval={false}
          className="d-flex justify-content-center row"
        >
          {users.map(
            (user, index) =>
              user._id !== currentUser && (
                <Carousel.Item
                  key={index}
                  className="col-lg-3 col-md-4 col-sm-12 "
                  // data-slide={index}
                >
                  <div className="card text-center d-block mx-auto">
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
                </Carousel.Item>
              )
          )}
        </Carousel>
      </>
    );
  } else {
    usersToRender = 'Loading...';
  }
  return <>{usersToRender}</>;
};

export default UserCard;
