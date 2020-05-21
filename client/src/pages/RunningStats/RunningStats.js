import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import Moment from 'react-moment';

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function RunningStats() {
  // Setting our component's initial state
  const [runningStats, setRunningStats] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);

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

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload RunningStats from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.pace && formObject.distance && formObject.totalTime) {
      API.saveRunningStat({
        pace: formObject.pace,
        distance: formObject.distance,
        date: formObject.date,
        totalTime: formObject.totalTime
      })
        .then(res => {
          formEl.current.reset();
          loadRunningStats();
        })
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Card title="Submit a run">
              <form ref={formEl}>
                <Input
                  onChange={handleInputChange}
                  name="pace"
                  placeholder="Pace (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="distance"
                  placeholder="Distance (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="date"
                  placeholder="Date"
                />
                <Input
                  onChange={handleInputChange}
                  name="totalTime"
                  placeholder="Total Time (required)"
                />
                <FormBtn
                  disabled={!(formObject.pace && formObject.distance && formObject.totalTime)}
                  onClick={handleFormSubmit}
                >
                  Submit a run
                </FormBtn>
              </form>
            </Card>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Start a challenge!</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Create a challenge to support your favorite local business!</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    ... Will add challenge form here
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-success">Save challenge</button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col size="md-6 sm-12">
            <Card title="My runs">
              {runningStats.length ? (
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
              )}
            </Card>
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
                <h3>No current challenges</h3>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default RunningStats;
