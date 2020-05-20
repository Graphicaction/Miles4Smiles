import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Card } from "../Card";
import { Input, FormBtn } from "../Form";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";

const UserData =() => {
  //  Setting our component's initial state
   const [userData, setUserData] = useState([]);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);

  

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.city && formObject.distance && formObject.pace) {
      API.saveUserData({
        city: formObject.city,
        distance: formObject.distance,
        pace: formObject.pace
        // avatar: formObject.avatar
      })
        .catch(err => console.log(err));
    }
  };
  return(
    <>
   <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hello! 
      <br></br>
      We are so excited you want to support your local business!</h1>
      <hr></hr>
      <p class="lead">To allow you to find runners with similar skills living close to you, we need some information from you before you can start to run for your local business!</p>
    </div>
   </div>

   <Container fluid>
      <Row>
        <Col size="md-6 sm-12">
          <Card title="Please answer these questions to set up a user profile.">
              <form ref={formEl}>
                <label>Where do you live?</label>
                {/* add google autocomplete */}
                 <Input
                  onChange={handleInputChange}
                  name="city"
                  placeholder="Raleigh, NC"
                /> 
                <label>How many miles do you usually run when you go for a run?</label>
                <Input
                  onChange={handleInputChange}
                  name="distance"
                  placeholder="3 miles"
                />
                <label>How long does it usually take you to run one mile?</label>
                <Input
                  onChange={handleInputChange}
                  name="pace"
                  placeholder="9:50min / mile"
                />
                <FormBtn
                  disabled={!(formObject.city && formObject.distance && formObject.pace)}
                  onClick={handleFormSubmit}
                >
                  Submit
              </FormBtn>
            </form>
         </Card>
       </Col> 
          {/* <Col size="md-6 sm-12">
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
          </Col> */}
        </Row>
      </Container>
      </>
  )
}

export default UserData;