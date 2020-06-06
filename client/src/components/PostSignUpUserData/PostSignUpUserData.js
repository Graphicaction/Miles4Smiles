import React, { useState, useRef, useContext } from "react";
import { useAlert } from 'react-alert';
import UserContext from "../../utils/UserContext";
import { Col, Container, Row } from "../Grid";
import Jumbotron from "../Jumbotron"
import { Card } from "../Card";
import { Input, FormBtn } from "../Form";
import usStates from "../usStates";
import AUTH from '../../utils/AUTH';
import validatePostData from "./validatePostData";
// import Welcome from '../../pages/Welcome';

const PostSignUpUserData =(props) => {
  //  Setting our component's initial state
  const { user, setUser } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  let firstLogin;
  const formEl = useRef(null);
  const id = user._id;
  const alert = useAlert();
  
 const handleInputChange =(event) =>{
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };
  // const [redirectTo, setRedirectTo] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //Updating user data when first login
    const valid = validatePostData(formObject.city, formObject.state, formObject.averageDistance, formObject.averagePace);
    if(valid){
      if (formObject.city) {
        AUTH.update(user._id,{
          city: formObject.city,
          state: formObject.state,
          averageDistance: parseInt(formObject.averageDistance),
          averagePace: formObject.averagePace,
          avatar: "",
          firstLogin: false
          })
          .then(res => {
            props.flip();
            setUser(res.data);
          }
          )
      }
    }else {
      alert.error("Please enter valid data");
    }
  };


  return(
    <>
 
   <Jumbotron >
    {/* <div className="container"> */}
      <h3 className="display-4">Hello! </h3>
      <h5>We are so excited you want to support your local business!</h5>
      <hr></hr>
      <p className="lead">To allow us to find runners with similar skills living close to you, we need some information from you!</p>
    {/* </div> */}
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
                    <label>How long is your usual run?</label>
                      <Row>
                        <Col size="md-5">
                          <Input
                            onChange={handleInputChange}
                            name="averageDistance"
                            placeholder="3"
                            //value={formObject.distance}
                          />
                        </Col>
                        <Col size="md-3">
                          <label>miles</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col size="md-6 sm-6">
                    <label>How fast do you run a mile?</label>
                      <Row>
                        <Col size="md-5">
                          <Input
                            onChange={handleInputChange}
                            name="averagePace"
                            placeholder="9:50"
                            //value={formObject.pace}
                          />
                        </Col>
                        <Col size="md-3">
                          <label>/mile</label>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                <br></br>

                <FormBtn
                  disabled={!(formObject.city && formObject.state && formObject.averageDistance && formObject.averagePace)}
                  onClick={handleFormSubmit}
                >
                <i className="fa fa-paper-plane mr-2"></i>
                  Submit
              </FormBtn>
            </form>
         </Card>
       </Col> 
    </Container>
    </>
  )
}

export default PostSignUpUserData;