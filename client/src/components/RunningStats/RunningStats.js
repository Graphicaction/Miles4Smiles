import React, { useState, useEffect, useRef, useContext } from "react";
import "./RunningStats.css"
import Jdenticon from "react-jdenticon";
import LineChart from "../LineChart";
import PieChart from "../PieChart";
import { Col, Row, Container } from "../Grid";
import { Card } from "../Card";
import ChallengeContext from "../../utils/ChallengeContext";
import ChallengeModal from "../ChallengeModal/ChallengeModal";
import ChallengeCard from "../ChallengeCard";
import DailyRunModal from "../DailyRunModal";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import UserContext from "../../utils/UserContext";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import UpdateUserModal from "../UpdateUserModal/UpdateUserModal";

function RunningStats() {
  const { user } = useContext(UserContext);
  console.log("Context UserCard: ", user);
  // Setting our component's initial state
  const [runningStats, setRunningStats] = useState([]);
  const [myChallenges, setMyChallenges] = useState([]);
  const [incomingChallenges, setIncomingChallenges] = useState([]);
  
  // Load all RunningStats and store them with setRunningStats
  useEffect(() => {
    loadRunningStats();
    loadChallenges();
  }, []);

  // Loads all RunningStats and sets them to RunningStats
  function loadRunningStats() {
    API.getRunningStats()
      .then(res => {
        setRunningStats(res.data.runningStats);
      })
      .catch(err => console.log(err));
  };

  // Loads all Challenges and sets them to Challenges
  function loadChallenges() {
    API.getChallenges()
      .then(res => {
        console.log("My challenge ",res.data.challenges);
        const startChallenges = []; 
        const invitedChallenges = [];
        res.data.challenges.map( challenge => {
          // Extracting the challenges started by or challenged to the current user
          if(challenge.challengers[0]===user.username) 
            startChallenges.push(challenge);
          if(challenge.challengers[1]===user.username)
          invitedChallenges.push(challenge);
        });
        setMyChallenges(startChallenges);
        setIncomingChallenges(invitedChallenges);
      })
      .catch(err => console.log(err));
  };

  const handleUserUpdate =() =>{
    console.log("update!!")
    console.log(user);
    return <UpdateUserModal/>


  }

  const handleUserDelete =(id) => {
    console.log(user._id)
    AUTH.deleteUser(user._id)
    .then(res => console.log("user deleted"))
    .catch(err => console.log(err));
    //add that immediately logged out
  }

  const options = {
    position: positions.TOP_CENTER,
    timeout: 2500,
    offset: '30px',
    transition: transitions.SCALE
  }
 
  let loggedInUser;
 if (user) {
    loggedInUser = { user }
    console.log(loggedInUser)
  return(
    <>
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <ChallengeCard myChallenges={myChallenges} incomingChallenges={incomingChallenges} />
          </Col>
          <Col size="md-6">
            <Card title="Update Your Information" style={{justifyContent:"center"}}>
              <div key= {user._id} className="card text-center">
              <div className="card-header text-center">
                <AlertProvider template={AlertTemplate} {...options}>
                    <DailyRunModal />
                    <ChallengeContext.Provider>
                      <ChallengeModal />
                    </ChallengeContext.Provider>
                </AlertProvider>
                  </div>
                <div className="card-body ">
                  <Jdenticon className="avatar" size="48" value={user._id} float="right"></Jdenticon>
                  <h5 className="card-title justify-content-center">{user.username}</h5>
                  <h6 className="card-subtitle mb-2 text-muted"><i className="fa fa-location"></i>{user.city}, {user.state}</h6>
                  <hr></hr>
                  <p className="card-text pace">Average pace: {user.averagePace} /mile</p>
                  <p className="card-text distance">Typical distance: {user.averageDistance} miles</p>
                  <hr></hr>
                  {/* <button className="btn card-link updateBtn" onClick={handleUserUpdate}><i className="fa fa-edit mr-2"></i>Update</button> */}
                  <UpdateUserModal/>
                  <button className="btn card-link deleteBtn ml-3"onClick={handleUserDelete}><i className="fa fa-trash mr-2"></i>Delete User Account</button>
                </div>
              </div>                
            </Card>
          </Col>
        </Row>
          
        <Row>
          <Col size="md-6 sm-12">
            <Card title="My Races">
              { (runningStats.length) ? (<LineChart />) : <h3>No races recorded yet</h3>
              }
            </Card>
          </Col>
          <Col size="md-6 sm-12">
            <Card title="Past Challenges">
              <PieChart />
            </Card>
          </Col>
        </Row>
      </Container>
      </>
    );
  } else {
    loggedInUser = "Loading..."
  }
  return <div>{loggedInUser}</div>
}

export default RunningStats;
