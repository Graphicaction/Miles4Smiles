import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import AUTH from '../../utils/AUTH';
import validateSignup from './validateSignup';
import { useAlert } from 'react-alert';
import './Login.scss';

function SignupForm() {
  const alert = useAlert();
  const [userObject, setUserObject] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstLogin: '',
    avatar: '',
    averagePace: '',
    averageDistance: '',
    challengesLost: '',
    ChallengesTied: '',
    challengesWon: '',
    city: '',
    state: '',
    redirectTo: null,
  });
  const [redirectTo, setRedirectTo] = useState(null);

  const handleChange = (event) => {
    setUserObject({
      ...userObject,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(userObject.password !== userObject.confirmPassword)
      alert.error("Password and Confirm Password are different!");
    else {
      const valid = validateSignup(userObject.firstName, userObject.lastName , userObject.username, userObject.password, userObject.confirmPassword);
      if (valid) {
        AUTH.signup({
          firstName: userObject.firstName,
          lastName: userObject.lastName,
          username: userObject.username,
          password: userObject.password,
          firstLogin: true,
          avatar: '',
          averagePace: '',
          averageDistance: '',
          challengesLost: '',
          ChallengesTied: '',
          challengesWon: '',
          city: '',
          state: '',
        }).then((response) => {
          if (!response.data.error) {
            alert.success('Welcome! New user is ready for login!');
            setRedirectTo('/');
          } else {
            alert.error('User already exists!');
          }
        });
      } else {
        alert.error('Please enter valid data!');
      }
    }
  };

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />;
  }

  return (
    <Container>
      <Card title="Register for Miles 4 Smiles">
        <form style={{ marginTop: 10 }}>
          <label htmlFor="username">First name: </label>
          <Input
            type="text"
            name="firstName"
            value={userObject.firstName}
            onChange={handleChange}
          />
          <label htmlFor="username">Last name: </label>
          <Input
            type="text"
            name="lastName"
            value={userObject.lastName}
            onChange={handleChange}
          />
          <label htmlFor="username">Username: </label>
          <Input
            type="text"
            name="username"
            value={userObject.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password: </label>
          <Input
            type="password"
            name="password"
            value={userObject.password}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <Input
            type="password"
            name="confirmPassword"
            value={userObject.confirmPassword}
            onChange={handleChange}
          />
          <Link to="/" className="btn loginBtn">
            <i className="fa fa-undo mr-2"></i>Return to Login
          </Link>
          <FormBtn onClick={handleSubmit}>
            <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
          </FormBtn>
        </form>
      </Card>
    </Container>
  );
}

export default SignupForm;
