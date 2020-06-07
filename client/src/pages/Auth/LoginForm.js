import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import { useAlert } from 'react-alert';
import { Container } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import validateLogin from './validateLogin';
import './Login.scss';

function LoginForm({ login, user, logout }) {
  const [userObject, setUserObject] = useState({
    username: '',
    password: '',
  });
  const [redirectTo, setRedirectTo] = useState(null);
  const alert = useAlert();

  const handleChange = (event) => {
    setUserObject({
      ...userObject,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = validateLogin(userObject.username, userObject.password);
    if (valid) {
      login(userObject.username, userObject.password, function (result) {
        if (result === 0) {
          alert.error('User does not exists!');
          logout();
        }
      });
      setRedirectTo('/welcome');
    } else {
      alert.error('Invalid User!');
    }
  };

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />;
  } else {
    return (
      <>
        <Jumbotron>
          <h2 className="display-4">Miles 4 Smiles </h2>
          <hr></hr>
          <h3>Run to support your local business!</h3>
        </Jumbotron>
        <Container>
          <Card title="Login to Miles 4 Smiles">
            <form style={{ marginTop: 10 }}>
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
              <Link to="/signup" className="btn registerBtn">
                <i className="fa fa-user-plus mr-2" />
                Register
              </Link>
              <a href="/auth/google" className="btn btn-info googleBtn ml-2">
                <i className="fa fa-google mr-2"></i>Sign in with Google
              </a>

              <FormBtn onClick={handleSubmit} className="loginBtn">
                <i className="fa fa-sign-in mr-2" />
                Login
              </FormBtn>
            </form>
          </Card>
        </Container>
      </>
    );
  }
}

export default LoginForm;
