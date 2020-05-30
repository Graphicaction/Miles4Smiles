import React, { useState, useEffect, useRef, useContext } from "react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import "./RunningStats.css"
import Jdenticon from "react-jdenticon";
import BarChart from "../BarChart";
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
import UpdateUserModal from "../UpdateUserModal/UpdateUserModal";
import RunningStatsContext from "../../utils/RunningStatsContext";


function RunningStats() {
  const { user } = useContext(UserContext);
  // Setting our component's initial state for RunningStats and Challenges
  const [runningStats, setRunningStats] = useState([]);
  const [myChallenges, setMyChallenges] = useState([]);
  const [incomingChallenges, setIncomingChallenges] = useState([]);
  const [newChallenge, setNewChallenge] =useState(false);
  // Setting our initial state for BarChart
  const [milesData, setMilesData] = useState([]);
  const [newRun, setNewRun] = useState(false);
  const [loading, setLoading] = useState(false);
  
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
        if(res.data.runningStats.length)
          setGraphData(res.data.runningStats);
      })
      .catch(err => console.log(err));
  };

  //Setting graph data array
  const setGraphData = (data) => {
    let graphData = [];
    if(data.length) {
      data.map(result => {
        graphData.push(result.distance);
      })
      //If no data for the day put 0
      for(let j = 0; j < 7; j++) {
        if(!graphData[j]) {
          graphData[j] = 0;
        }
      }
    setMilesData([...graphData]);
    setNewRun(true);
    setLoading(true);
    }
  }

  function handleBarChart(){
    loadRunningStats();
  }
  // Loads all Challenges and sets them to Challenges
  function loadChallenges() {
    API.getChallenges()
      .then(res => {
        const startChallenges = []; 
        const invitedChallenges = [];
        res.data.challenges.map( challenge => {
          // Extracting the challenges started by or challenged to the current user
            if(challenge.status!=="finish"){
              if(challenge.challengers[0]===user.username) 
                startChallenges.push(challenge);
              if(challenge.challengers[1]===user.username)
                invitedChallenges.push(challenge);
            }
          
          });
        setMyChallenges(startChallenges);
        setIncomingChallenges(invitedChallenges);
        setNewChallenge(true);
      
      })
      .catch(err => console.log(err));
  };

  const handleChallenge = () => {
    loadChallenges();
  }

  const handleChallengeChange = (id, reply) => {
    if(reply=="accept"){
      API.updateChallenge(id,{status: "pending"})
      .then(res => {
        loadChallenges();
      })
      .catch(err => {
          console.log(err);
      });
    } else {
      API.deleteChallenge(id);
      loadChallenges();
    }
  }

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
  return(
    <>
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <ChallengeCard myChallenges={myChallenges} incomingChallenges={incomingChallenges} handleChallenge={handleChallenge} handleChallengeChange={handleChallengeChange} />
          </Col>
          <Col size="md-6">
            <Card title="Update Your Information" style={{justifyContent:"center"}}>
              <div key= {user._id} className="card text-center">
              <div className="card-header text-center">
                <AlertProvider template={AlertTemplate} {...options}>
                    <RunningStatsContext.Provider>
                      <DailyRunModal handleBarChart={handleBarChart} />
                    </RunningStatsContext.Provider>
                    <ChallengeContext.Provider myChallenges={myChallenges} incomingChallenges={incomingChallenges}>
                      <ChallengeModal handleChallenge={handleChallenge} />
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
              { (newRun) ? (<BarChart milesData={milesData} />) : <p>No races recorded yet</p>
              }
            </Card>
          </Col>
          <Col size="md-6 sm-12">
            <Card title="Past Challenges" style={{backgroundColor: "whitesmoke"}}>
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
