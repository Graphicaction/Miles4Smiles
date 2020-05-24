import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import './Nav.css';

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
      <Link to ="/welcome" className="navbar-brand">Miles 4 Smiles
        {/* <img src="./M4S.png" width="30" height="30" alt="logo" /> */}
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          {/* <li className="nav-item active ">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li> */}
          <li className="nav-item">
            <Link to ="/dashboard" className="nav-link" >Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to ={"/mypage/" +props.user._id} className="nav-link" >My Page</Link>
          </li>
        </ul>

        <div className="float-right greeting">
        {greeting} ! <button className="btn ml-5 logout" onClick={props.logout}>Logout</button>
        </div>
        </div>
    </nav>
  )
};

export default Nav;
