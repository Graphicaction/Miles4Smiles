import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import AUTH from "../../utils/AUTH";
import { useAlert } from 'react-alert';
import { Container} from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import validateLogin from "./validateLogin";
import "./Login.scss";

function LoginForm({login, user}) {
  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
  });
  const [redirectTo, setRedirectTo] = useState(null);
  const alert = useAlert();
  
	const handleChange = (event) => {
		setUserObject({
      ...userObject,
			[event.target.name]: event.target.value
		});
  };
  
  const googleDirect = (event) =>{
    event.preventDefault();
    AUTH.getGoogle()
  }

  // const githubDirect =(event) => {
  //   event.preventDefault();
  //   AUTH.getGithub("/auth/github")
  // }

	const handleSubmit = (event) => {
    event.preventDefault();
    const valid = validateLogin(userObject.username, userObject.password);
    if(valid) {
      const validUser = login(userObject.username, userObject.password);
      //Not solved for does not exists user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log(validUser);
      // if(!validUser){
      //   alert.success('User doeot s nexists!');
      //   setUserObject({
      //     username: "",
      //     password: ""
      //   });
      // }
      // else {
        setRedirectTo('/welcome');
      // }
    } else
    {
      alert.success('Invalid User!');
    }
	};

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <>
      {/* <Navbar /> */}
      <Jumbotron>
      <h2 className="display-4">Miles 4 Smiles </h2>
      <hr></hr>
      <h3>Run to support your local business!</h3>
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
                <Link to="/signup" className="btn registerBtn"><i className="fa fa-user-plus mr-2"/>Register</Link>
                <button onClick={googleDirect} className="btn btn-info googleBtn ml-2"><i className="fa fa-google mr-2"></i>Sign in with Google</button>
                {/* <button onClick={githubDirect} className="btn btn-dark githubBtn ml-2"><i className="fa fa-github mr-2"></i>Sign in with Github</button> */}

                <FormBtn onClick={handleSubmit} className="loginBtn"><i className="fa fa-sign-in mr-2"/>Login</FormBtn>
              </form>
            </Card>
      </Container>
      </>
    )
  }
}

export default LoginForm;
