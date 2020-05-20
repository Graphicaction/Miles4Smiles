import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

function RunningStats() {
  // Setting our component's initial state
  const [runningStats, setRunningStats] = useState([]);
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

  // Deletes a book from the database with a given id, then reloads RunningStats from the db
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
          <Col size="md-3 sm-12">
            <Card title="Tell us about your running routine!">
                <form ref={formEl}>
                  <label>How many minutes: seconds does it usually take you to run a mile?</label>
                  <Input
                    onChange={handleInputChange}
                    name="pace"
                    placeholder="Pace (required)"
                  /> 
                  <label>How many miles do you prefer to run?</label>
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
                  Submit runningStat
                </FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="md-6 sm-12">
            <Card title="RunningStats On My List">
              {runningStats.length ? (
                <List>
                  {runningStats.map(runningStat => (
                    <ListItem key={runningStat._id}>
                      <Link to={"/runningStats/" + runningStat._id}>
                        <strong>
                        <p>I run a mile in {runningStat.pace} minutes.</p>
                        I prefer to run {runningStat.distance} miles. 
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
          </Col>
        </Row>
      </Container>
    );
  }


export default RunningStats;
