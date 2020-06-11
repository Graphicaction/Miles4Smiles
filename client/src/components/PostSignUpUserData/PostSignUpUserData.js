import React, { useState, useRef, useContext } from 'react';
import { useAlert } from 'react-alert';
import UserContext from '../../utils/UserContext';
import { Col, Container, Row } from '../Grid';
import Jumbotron from '../Jumbotron';
import { Card } from '../Card';
import { Input, FormBtn } from '../Form';
import usStates from '../usStates';
import AUTH from '../../utils/AUTH';
import validatePostData from './validatePostData';

//is used for first log in ever to collect more user and wont appear again on next log in
const PostSignUpUserData = (props) => {
  //  Setting our component's initial state
  const { user, setUser } = useContext(UserContext);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);
  const alert = useAlert();

  const paceSelector = [
    '6:00',
    '6:30',
    '7:00',
    '7:30',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //Updating user data when first login
    const valid = validatePostData(
      formObject.city,
      formObject.state,
      formObject.averageDistance,
      formObject.averagePace
    );
    if (valid) {
      if (formObject.city) {
        AUTH.update(user._id, {
          city: formObject.city,
          state: formObject.state,
          averageDistance: parseInt(formObject.averageDistance),
          averagePace: formObject.averagePace,
          avatar: '',
          firstLogin: false,
        }).then((res) => {
          props.flip();
          setUser(res.data);
        });
      }
    } else {
      alert.error('Please enter valid/all data');
    }
  };

  return (
    <>
      <Jumbotron>
        <h3 className="display-4">Hello! </h3>
        <h5 className="postSignUpHeader">
          We are so excited you want to support your local business!
        </h5>
        <hr></hr>
        <p className="lead">
          To allow us to find runners with similar skills living close to you,
          we need some information from you!
        </p>
      </Jumbotron>

      <Container>
        <Col size="md-12 sm-12">
          <Card title="Please answer these questions to set up a user profile.">
            <form ref={formEl}>
              <Row>
                <Col size="md-6 sm-12">
                  <label>What city do you live in?</label>
                  <Input
                    onChange={handleInputChange}
                    name="city"
                    placeholder="Raleigh"
                  />
                </Col>
                <Col size="md-6 sm-6">
                  <label>What state do you live in?</label>
                  <select
                    className="form-control"
                    id="usStateSelect"
                    name="state"
                    onChange={handleInputChange}
                    placeholder="NC"
                  >
                    <option defaultValue>Choose...</option>
                    {usStates.map((states, i) => (
                      <option key={i}>{states.name}</option>
                    ))}
                  </select>
                </Col>
              </Row>

              <Row>
                <Col size="md-6 sm-6">
                  <label>How far do you usually run?</label>
                  <Row>
                    <Col size="md-5">
                      <Input
                        onChange={handleInputChange}
                        name="averageDistance"
                        placeholder="3"
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
                      <select
                        className="form-control"
                        id="paceSelector"
                        name="averagePace"
                        onChange={handleInputChange}
                        placeholder="9:30"
                      >
                        <option defaultValue>Choose...</option>
                        {paceSelector.map((pace, i) => (
                          <option key={i}>{pace}</option>
                        ))}
                      </select>
                    </Col>
                    <Col size="md-3">
                      <label>/mile</label>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br></br>

              <FormBtn
                disabled={
                  !(
                    formObject.city &&
                    formObject.state &&
                    formObject.averageDistance &&
                    formObject.averagePace
                  )
                }
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
  );
};

export default PostSignUpUserData;
