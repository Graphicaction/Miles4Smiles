import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from "@material-ui/core";



// import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username} </strong>
			</Fragment>
		)
  }
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className="navbar-brand">Miles 4 Smiles</Link>
        <div >
        {greeting} - <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
        </div>
      </Toolbar>
    </AppBar>
  )
};

export default Nav;