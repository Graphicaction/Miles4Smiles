import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container} from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import Jumbotron from "../../components/Jumbotron/Jumbotron"
import Axios from 'axios';
//import bgIMG from "./bgIMG.jpg"
// import M4S from "./M4S.png";

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
  
  const googleDirect = (event) =>{
    event.preventDefault();
    Axios.get("/auth/google")
  }

	const handleSubmit = (event) => {
		event.preventDefault();
		login(userObject.username, userObject.password);
		setRedirectTo('/welcome');
	};

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <>
      {/* <Navbar /> */}
      <Jumbotron>
        <div className="container">
          {/* <img src={M4S} width="200" height="50" /> */}
          <h1 className="display-4">Miles 4 Smiles</h1>
          <br></br>
          <h2>Run to support your local business!</h2>
          <hr></hr>
          <p className="lead">Please sign up or log in to your account to start a run!</p>
          </div>
      </Jumbotron>
         <Container>
            <Card title="Login to Miles 4 Smiles">
              <form style={{marginTop: 10}}>
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
                <Link to="/signup" className="btn btn-dark">Register</Link>
                <button onClick={googleDirect} className="btn btn-info ml-2"><i className="fa fa-google mr-2"></i>Sign in with google</button>

                <FormBtn onClick={handleSubmit}>Login</FormBtn>
              </form>
            </Card>
      </Container>
      </>
    )
  }
}

export default LoginForm;
