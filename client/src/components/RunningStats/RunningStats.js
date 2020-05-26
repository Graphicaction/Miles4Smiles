import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./RunningStats.css"
// import Moment from 'react-moment';
import Jdenticon from "react-jdenticon";

import LineChart from "../LineChart";
import PieChart from "../PieChart";
// import UserCard from "../UserCard/UserCard"
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Card } from "../Card";
import ChallengeContext from "../../utils/ChallengeContext";
import ChallengeModal from "../ChallengeModal/ChallengeModal";
import DailyRunModal from "../DailyRunModal";
import API from "../../utils/API";

function RunningStats() {
  // Setting our component's initial state
  const [runningStats, setRunningStats] = useState([]);
  const [milesData, setMilesData] = useState([]);
  const [challenges, setChallenges] = useState([]);
  // const [formObject, setFormObject] = useState({});
  // const formEl = useRef(null);

  // Load all RunningStats and store them with setRunningStats
  useEffect(() => {
    loadRunningStats();
  }, []);

  // Loads all RunningStats and sets them to RunningStats
  function loadRunningStats() {
    API.getRunningStats()
      .then(res => {
        setRunningStats(res.data.runningStats);
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
    setMilesData(graphData);
    }
  }
  // Loads all Challenges and sets them to Challenges
  function loadChallenges() {
    API.getChallenges()
      .then(res => {
        console.log(res.data.challenges);
        setChallenges(res.data.challenges);
      })
      .catch(err => console.log(err));
  };

  // Deletes a run from the database with a given id, then reloads RunningStats from the db
  function deleteRunningStat(id) {
    API.deleteRunningStat(id)
      .then(res => loadRunningStats())
      .catch(err => console.log(err));
  }

  
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Card title="My challenges">
              {challenges.length ? (
                <List>
                  {challenges.map(challenge => (
                    <ListItem key={challenge._id}>
                      <Link to={"/challenge/" + challenge._id}>
                        <strong>
                        <p>Supported business: {challenge.businessName}</p>
                        </strong>
                      </Link>
                      {/* <DeleteBtn onClick={() => deleteRunningStat(runningStat._id)} /> */}
                    </ListItem>
                  ))}
                </List>
              ) : (
                // hardcoded until we can render, then we will write "No Challenges yet"
              
            <>
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Challenge from Bob Bobsen</h5>
                <p className="card-text">Bob challenges you to do a 3 mile race. The slower runner donates $10 per mile to Bob's Burger.</p>
                <a href="#" className="btn accept mr-5">Accept Challenge</a><a href="#" className="btn deny">Deny Challenge</a>
              </div>
              <div className="card-footer text-muted">
                  2 days ago
              </div>
            </div>
       
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Challenge from Bob Bobsen</h5>
                <p className="card-text">Bob challenges you to do a 3 mile race. The slower runner donates $10 per mile to Bob's Burger.</p>
                <a href="#" className="btn accept mr-5">Accept Challenge</a><a href="#" className="btn deny">Deny Challenge</a>
              </div>
              <div className="card-footer text-muted">
                2 days ago
              </div>
            </div>
            </>
     
              )}
            </Card>
          </Col>
            
          <Col size="md-6">
        
            <Card title="Update Your Information" style={{justifyContent:"center"}}>
              
              {/* <DailyRunModal />
              <ChallengeModal /> */}
                  
              <div className="card text-center">
              <div className="card-header text-center">
                    <DailyRunModal />
                    <ChallengeContext.Provider value={{ challenges }}>
                      <ChallengeModal />
                    </ChallengeContext.Provider>
                  </div>
                <div className="card-body ">
                  <Jdenticon className="avatar" size="48" value="addIDLater" float="right"></Jdenticon>
                  <h5 className="card-title justify-content-center">USERNAME</h5>
                  <h6 className="card-subtitle mb-2 text-muted"><i className="fa fa-location"></i>CITY, STATE</h6>
                  <hr></hr>
                  <p className="card-text pace">Average mile pace: PACE</p>
                  <p className="card-text distance">Preferred distance: DISTANCE</p>
                  <hr></hr>
                  <button className="btn card-link updateBtn"><i className="fa fa-edit mr-2"></i>Update</button>
                  <button className="btn btn-light card-link deleteBtn ml-3"><i className="fa fa-trash mr-2"></i>Delete</button>
                </div>
              </div>                
            </Card>
            
          </Col>
          </Row>
          
          <Row>
          <Col size="md-6 sm-12">
            <Card title="My runs">
              { (runningStats.length) ? (<LineChart milesData={milesData} />) : <h3>No Run recorded!</h3>
              }
              
              {/* {runningStats.length ? (
                <List>
                  {runningStats.map(runningStat => (
                    <ListItem key={runningStat._id}>
                      <Link to={"/runningStats/" + runningStat._id}>
                        <strong>
                        <p>Pace: {runningStat.pace} minutes</p>
                          Distance: {runningStat.distance} miles 
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => deleteRunningStat(runningStat._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )} */}
            </Card>
            </Col>
            
            <Col size="md-6 sm-12">
            <Card title="Past Challenges">
              <PieChart />
              
            </Card>
            
            </Col>
          </Row>
      </Container>
    );
  }


export default RunningStats;
