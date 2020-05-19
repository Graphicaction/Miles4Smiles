import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import AUTH from '../../utils/AUTH';

function SignupForm() {
  const [userObject, setUserObject] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    redirectTo: null
  });
  const [redirectTo, setRedirectTo] = useState(null);

  const handleChange = (event) => {
    setUserObject({
      ...userObject,
			[event.target.name]: event.target.value
		});
	};
  
	const handleSubmit = (event) => {
    event.preventDefault();
    // TODO - validate!
		AUTH.signup({
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      username: userObject.username,
      password: userObject.password
    }).then(response => {
      console.log(response);
      if (!response.data.errmsg) {
        setRedirectTo('/');
      } else {
        console.log('duplicate');
      }
    });
  };
  
  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  }
  
  return (
    <Container>
          <Card title="Register for React Reading List">
            <form style={{marginTop: 10}}>
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
              <Link to="/" className="btn btn-dark">Login</Link>
              <FormBtn onClick={handleSubmit}>Register</FormBtn>
            </form>
          </Card>
    </Container>
  )
}

export default SignupForm;
