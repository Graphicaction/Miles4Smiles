import React, { useState, useRef } from "react";
// import Autocomplete from "./components/Autocomplete/Autocomplete"
// import Script from "react-load-script";
// import { Redirect, Link } from 'react-router-dom';

import { Col, Container, Row } from "../Grid";
import Jumbotron from "../Jumbotron"
import { Card } from "../Card";
import { Input, FormBtn } from "../Form";
import usStates from "../usStates";
import AUTH from '../../utils/AUTH';
// import Welcome from '../../pages/Welcome';

const PostSignUpUserData =(props) => {
  //  Setting our component's initial state
  const [formObject, setFormObject] = useState({});
  let firstLogin;
  const formEl = useRef(null);
  const id = props.id;

 const handleInputChange =(event) =>{
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };
  // const [redirectTo, setRedirectTo] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //Updating user data when first login
    if (formObject.city) {
      AUTH.update(id,{
        city: formObject.city,
        state: formObject.state,
        averageDistance: parseInt(formObject.distance),
        averagePace: parseInt(formObject.pace),
        avatar: "",
        firstLogin: false
        })
        .then(res => {
          console.log(res.data);
          // setRedirectTo('/dashboard');
        })
    }

  };

  // if (redirectTo) {
  //   return <Redirect to={{ pathname: redirectTo, state: {firstLogin: false} }} />
  // }

  return(
    <>
 
   <Jumbotron >
    <div className="container">
      <h1 className="display-4">Hello! </h1>
      <br></br>
      <h2>We are so excited you want to support your local business!</h2>
      <hr></hr>
      <p className="lead">To allow you to find runners with similar skills living close to you, we need some information from you before you can start to run for your local business!</p>
    </div>
   </Jumbotron>

   <Container>
      {/* <Row> */}
        <Col size="md-12 sm-12">
          <Card title="Please answer these questions to set up a user profile.">
              <form ref={formEl}>
                <Row>
                  <Col size="md-6 sm-12">
             
                    <label>What city do you live in?</label>
                    {/* <Row>
                        <Col size="md-9"> */}
                    {/* add google autocomplete */}
                          <Input 
                            onChange={handleInputChange}
                            name="city"
                            placeholder="Raleigh"
                            //value={formObject.city}
                          /> 
                        {/* </Col>
                    </Row> */}
                  </Col>
                  <Col size="md-6 sm-6">
                    <label>What state do you live in?</label>
                      {/* add usState data to select a state */}
                          {/* <Input 
                            onChange={handleInputChange}
                            name="state"
                            placeholder="NC"
                          />  */}
                           <select className="form-control" id="usStateSelect" name="state" onChange={handleInputChange}  placeholder="NC">
                           <option defaultValue>Choose...</option>
                           {usStates.map((states, i) =>(
                            <option key={i} >{states.name}</option>
                            ))}
                          </select>

             
                  </Col>
                </Row>

                <Row>
                  <Col size="md-6 sm-6">
                    <label>How long is you usual run?</label>
                      <Row>
                        <Col size="md-5">
                          <Input
                            onChange={handleInputChange}
                            name="distance"
                            placeholder="3"
                            //value={formObject.distance}
                          />
                        </Col>
                        <Col size="md-3">
                          <label>Miles</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col size="md-6 sm-6">
                    <label>How fast do you run a mile?</label>
                      <Row>
                        <Col size="md-5">
                          <Input
                            onChange={handleInputChange}
                            name="pace"
                            placeholder="9:50"
                            //value={formObject.pace}
                          />
                        </Col>
                        <Col size="md-3">
                          <label>min/mile</label>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                <br></br>

                <FormBtn
                  disabled={!(formObject.city && formObject.state && formObject.distance && formObject.pace)}
                  onClick={handleFormSubmit}
                >
                <i className="fa fa-paper-plane mr-2"></i>
                  Submit
              </FormBtn>
            </form>
         </Card>
       </Col> 
    </Container>
    {/* <Welcome firstLogin = {firstLogin} /> */}
    </>
  )
}

export default PostSignUpUserData;