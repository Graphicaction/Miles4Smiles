import React, { useState, useEffect, useContext } from 'react';
import UserCard from '../../components/UserCard/UserCard';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import PostSignUpUserData from '../../components/PostSignUpUserData/PostSignUpUserData';
import { Card } from '../../components/Card';
import { Row, Col, Container } from '../../components/Grid';
import UserContext from '../../utils/UserContext';
import API from '../../utils/API';
import LatestUpdate from '../../components/LatestUpdate/LatestUpdate';
import ChallengeContext from '../../utils/ChallengeContext';

const Welcome = (props) => {
  const [challenges, setChallenges] = useState([]);
  const [firstLogin, setFirstLogin] = useState(false);
  const { user } = useContext(UserContext);
  //setup to direct first time login user to different component before going to usual welcome

  useEffect(() => {
    if (user) setFirstLogin(user.firstLogin);
  }, [user]);

  useEffect(() => {
    loadChallenges();
  }, []);

  function loadChallenges() {
    let allChallenges = [];
    let distanceData = [];
    let donatedAmountData = [];
    let donorData = [];
    let challengersData = [];

    API.getChallenges()
      .then((response) => {
        allChallenges = response.data.challenges;
        allChallenges.forEach((challenge) => {
          distanceData.push(challenge.distance);
          donatedAmountData.push(challenge.donatedAmount);
          donorData.push(challenge.donor);
          challengersData.push(challenge.challengers);
        });
        setChallenges(allChallenges);
      })
      .catch((err) => console.log(err));
  }
  //change user from first time to returning user
  const flip = () => {
    setFirstLogin(false);
  };

  return (
    <div>
      {firstLogin && (
        //if it's a first time user and more info needs to be entered to complete the user data
        <div>
          <PostSignUpUserData id={user._id} flip={flip} />
        </div>
      )}
      {!firstLogin && (
        //if it's a returning user display this
        <div>
          <Jumbotron>
            <h2 className="display-4">Miles 4 Smiles </h2>
            <hr></hr>
            <h3>
              We are so excited you are back again and want to continue to
              support your local business!
            </h3>
            <h3>
              Select and challenge a highlighted user if you want to compete
              with a user who runs at a similar pace or scroll through all
              users.
            </h3>
          </Jumbotron>

          {/* shows all users apart from logged in user himself and lets logged in user challenge them */}
          <Row>
            <Container fluid>
              <UserCard />
            </Container>
          </Row>

          <Row>
            <Col size="12">
              <Card title="Latest Miles 4 Smiles Updates">
                <ChallengeContext.Provider value={{ challenges }}>
                  {challenges.length > 0 ? (
                    <LatestUpdate />
                  ) : (
                    <p className="text-center">
                      No completed challenge yet. You should start one!
                    </p>
                  )}
                </ChallengeContext.Provider>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Welcome;
