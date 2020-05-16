import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Grid} from "@material-ui/core";
import { Cards } from '../../components/Cards';
import { Input, FormBtn } from '../../components/Form';

function LoginForm({login}) {
  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
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
		login(userObject.username, userObject.password);
		setRedirectTo('/');
	};

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <>
      <Container>
      <Grid container item spacing={3} justify="center">
            <Cards title="Login to Miles 4 Smiles">
              <form style={{marginTop: 10}}>
                <label htmlFor="username">Username: </label>
                <Input
                  type="text"
                  name="username"
                  value={userObject.username}
                  onChange={handleChange}
                />
                <br></br>
                <label htmlFor="password">Password: </label>
                <Input
                  type="password"
                  name="password"
                  value={userObject.password}
                  onChange={handleChange}
                />
                <Link to="/signup">Register</Link>
                <FormBtn onClick={handleSubmit}>Login</FormBtn>
              </form>
            </Cards>
        </Grid>
      </Container>
      </>
    )
  }
}

export default LoginForm;

