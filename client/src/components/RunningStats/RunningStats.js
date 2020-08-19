import React, { useState, useEffect, useContext } from 'react';
import './RunningStats.scss';
import Jdenticon from 'react-jdenticon';
import BarChart from '../BarChart';
import PieChart from '../PieChart';
import { Col, Row, Container } from '../Grid';
import { Card } from '../Card';
import ChallengeContext from '../../utils/ChallengeContext';
import ChallengeModal from '../ChallengeModal/ChallengeModal';
import ChallengeCard from '../ChallengeCard';
import DailyRunModal from '../DailyRunModal';
import API from '../../utils/API';
import AUTH from '../../utils/AUTH';
import UserContext from '../../utils/UserContext';
import UpdateUserModal from '../UpdateUserModal/UpdateUserModal';
import RunningStatsContext from '../../utils/RunningStatsContext';
import ViewLosses from '../ViewLosses/ViewLosses';

// inside of mypage page includes all personal user information about last races, challenges coming in and going out, allows
// update and delete user data, log a race, see what donations still need to be done and how many challenges were won/lost

function RunningStats(props) {
  const { user } = useContext(UserContext);
  // Setting our component's initial state for RunningStats and Challenges
  const [myChallenges, setMyChallenges] = useState([]);
  const [incomingChallenges, setIncomingChallenges] = useState([]);
  const [myLosses, setMyLosses] = useState([]);
  // Setting our initial state for BarChart and Piechart
  const [milesData, setMilesData] = useState([]);
  const [newRun, setNewRun] = useState(false);
  const [pieData, setPieData] = useState(false);
  const [updateUser, setUpdateUser] = useState(true);

  const [date, setDate] = useState([]);

  // Load all RunningStats and store them with setRunningStats
  useEffect(() => {
    loadRunningStats();
    loadChallenges();
  }, []);

  // Loads all RunningStats and sets them to RunningStats
  function loadRunningStats() {
    API.getRunningStats()
      .then((res) => {
        if (res.data.runningStats.length) {
          setGraphData(res.data.runningStats);
          setRaceDate(res.data.runningStats);
        }
      })
      .catch((err) => console.log(err));
  }

  //Setting graph data array
  const setGraphData = (data) => {
    let graphData = [];
    if (data.length) {
      data.forEach((result) => {
        graphData.push(result.distance);
      });
      //If no data for the day put 0
      for (let j = 0; j < 7; j++) {
        if (!graphData[j]) {
          graphData[j] = 0;
        }
      }
      setMilesData([...graphData]);
      setNewRun(true);
    }
  };

  const setRaceDate = (data) => {
    let graphDates = [];
    if (data.length) {
      data.forEach((result) => {
        // to not show whole date but only month and day without year and time
        graphDates.push(result.date.slice(5, 10));
      });
      //If no data for the day put 0
      for (let j = 0; j < 7; j++) {
        if (!graphDates[j]) {
          graphDates[j] = '';
        }
      }
      graphDates.sort((a, b) => (a > b ? -1 : 1));

      setDate([...graphDates]);
      setNewRun(true);
    }
  };

  function handleBarChart() {
    loadRunningStats();
  }
  // Loads all Challenges and sets them to Challenges
  function loadChallenges() {
    API.getChallenges()
      .then((res) => {
        const startChallenges = [];
        const invitedChallenges = [];
        const losses = [];
        const donated = [];
        res.data.challenges.forEach((challenge) => {
          // Extracting the challenges started by or challenged to the current user
          if (challenge.status === 'donated') setPieData(true);
          donated.push(challenge);
          if (challenge.status !== 'finish') {
            if (challenge.status === 'donated') {
            } else {
              if (challenge.challengers[0] === user.username)
                startChallenges.push(challenge);
              if (challenge.challengers[1] === user.username)
                invitedChallenges.push(challenge);
            }
          }
          if (challenge.status === 'finish') {
            setPieData(true);
            if (challenge.status === 'finish') {
              if (challenge.donor === user.username) {
                losses.push(challenge);
              }
            }
          }
        });
        setMyChallenges(startChallenges);
        setIncomingChallenges(invitedChallenges);
        setMyLosses(losses);
      })
      .catch((err) => console.log(err));
  }

  const handleChallenge = () => {
    loadChallenges();
  };
  //updating status if 'accept' challenge or delete if 'deny'
  const handleChallengeChange = (id, reply) => {
    if (reply === 'accept') {
      API.updateChallenge(id, { status: 'pending' })
        .then((res) => {
          loadChallenges();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      API.deleteChallenge(id);
      loadChallenges();
    }
  };
  //re-render user card on mypage if updates or delete user account if requested
  const handleUserUpdate = () => {
    setUpdateUser(true);
  };

  const handleUserDelete = (_id) => {
    props.logout();
    AUTH.deleteUser(user._id)
      .then((response) => {
        if (response.status === 200) {
          console.log('user deleted');
        }
      })
      .catch((err) => console.log(err));
  };

  let loggedInUser;
  if (user) {
    loggedInUser = { user };
    return (
      <>
        <Container fluid>
          <Row fluid>
            <Card
              title="Don't forget to donate"
              className="col-lg-12 col-sm-12"
            >
              {myLosses.length > 0 ? (
                <ViewLosses
                  losses={myLosses}
                  handleChallenge={handleChallenge}
                />
              ) : (
                <h5 className="text-center">
                  No pending donations- great work!
                </h5>
              )}
            </Card>
          </Row>
          <Row>
            <Col size="md-6 sm-12">
              <Card title="My Challenges">
                {myChallenges.length || incomingChallenges.length ? (
                  <ChallengeCard
                    myChallenges={myChallenges}
                    incomingChallenges={incomingChallenges}
                    handleChallenge={handleChallenge}
                    handleChallengeChange={handleChallengeChange}
                  />
                ) : (
                  <h5 className="text-center">No pending challenges</h5>
                )}
              </Card>
            </Col>
            <Col size="md-6">
              <Card
                title="Update Your Information"
                style={{ justifyContent: 'center' }}
              >
                <div key={user._id} className="card text-center challengeCard">
                  <Row>
                    <Col size="lg-6 sm-12">
                      <RunningStatsContext.Provider>
                        <DailyRunModal handleBarChart={handleBarChart} />
                      </RunningStatsContext.Provider>
                    </Col>
                    <Col size="lg-6 sm-12">
                      <ChallengeContext.Provider
                        myChallenges={myChallenges}
                        incomingChallenges={incomingChallenges}
                      >
                        <ChallengeModal handleChallenge={handleChallenge} />
                      </ChallengeContext.Provider>
                    </Col>
                  </Row>
                  <hr></hr>
                  {updateUser && (
                    <div className="card-body ">
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
                        {user.city}, {user.state}
                      </h6>
                      <hr></hr>
                      <p className="card-text pace">
                        Average Pace: {user.averagePace} /mile
                      </p>
                      <p className="card-text distance">
                        Typical Distance: {user.averageDistance} miles
                      </p>
                      <hr></hr>
                      <Row>
                        <Col size="lg-6 sm-12">
                          <UpdateUserModal
                            handleUserUpdate={handleUserUpdate}
                          />
                        </Col>
                        <Col size="lg-6 sm-12">
                          <button
                            className="btn card-link deleteBtn ml-3"
                            onClick={handleUserDelete}
                          >
                            <i className="fa fa-trash mr-2"></i>Delete Account
                          </button>
                        </Col>
                      </Row>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col size="md-6 sm-12">
              <Card title="My Races">
                {newRun ? (
                  <BarChart
                    data={milesData.slice(0, 7)}
                    xTickLabel={date.slice(0, 7)}
                    label="Races Completed"
                    yAxesTick=""
                    yAxesMax="45"
                    yLabelString="Distance Run (Km)"
                    xLabelString="Date"
                  />
                ) : (
                  <h5 className="text-center">No races recorded yet</h5>
                )}
              </Card>
            </Col>
            <Col size="md-6 sm-12">
              <Card title="Past Challenges">
                {pieData ? (
                  <PieChart />
                ) : (
                  <h5 className="text-center">No races lost or won yet</h5>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    loggedInUser = 'Loading...';
  }
  return <div>{loggedInUser}</div>;
}

export default RunningStats;
