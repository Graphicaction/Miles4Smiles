import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./RunningStats.css"
// import Moment from 'react-moment';
import LineChart from "../LineChart";
import PieChart from "../PieChart";

import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Card } from "../Card";
//import { Input, FormBtn } from "../Form";
import DeleteBtn from "../DeleteBtn";
import ChallengeModal from "../ChallengeModal/ChallengeModal";
import DailyRunModal from "../DailyRunModal";
import API from "../../utils/API";

function RunningStats() {
  // Setting our component's initial state
  const [runningStats, setRunningStats] = useState([]);
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
        // console.log(res.data.RunningStats);
        setRunningStats(res.data.runningStats);
      })
      .catch(err => console.log(err));
  };

  // Loads all Challenges and sets them to Challenges
  function loadChallenges() {
    API.getChallenges()
      .then(res => {
        console.log(res.data.challenges);
        setChallenges(res.data.runningStats);
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
                <p class="card-text">Bob challenges you to do a 3 mile race. The slower runner donates 10$ per mile to Bob's Burger.</p>
                <a href="#" class="btn accept mr-5">Accept Challenge</a><a href="#" className="btn deny">Deny Challenge</a>
              </div>
              <div class="card-footer text-muted">
                  2 days ago
              </div>
            </div>
       
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Challenge from Bob Bobsen</h5>
                <p class="card-text">Bob challenges you to do a 3 mile race. The slower runner donates 10$ per mile to Bob's Burger.</p>
                <a href="#" class="btn accept mr-5">Accept Challenge</a><a href="#" className="btn deny">Deny Challenge</a>
              </div>
              <div class="card-footer text-muted">
                2 days ago
              </div>
            </div>
            </>
     
              )}
            </Card>
          </Col>
            
          <Col size="md-6">
            <DailyRunModal />
            <ChallengeModal />
          </Col>
          </Row>
          
          <Row>
          <Col size="md-6 sm-12">
            <Card title="My runs">
              <LineChart />
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
