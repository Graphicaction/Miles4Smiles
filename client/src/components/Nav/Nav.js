import React, { Fragment } from 'react';
import {Link } from 'react-router-dom';
import './Nav.scss';

const Nav = (props) => {
  let greeting;

  if (!props.user) {
    greeting = <Fragment>Hello Guest</Fragment>;
  } else if (props.user.firstName) {
    greeting = (
      <Fragment>
        Welcome back, <strong>{props.user.firstName}</strong>
      </Fragment>
    );
  } else if (props.user.username) {
    greeting = (
      <Fragment>
        Welcome back, <strong>{props.user.username} </strong>
      </Fragment>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/welcome" className="navbar-brand">
        Miles 4 Smiles
        {/* <img src="./M4S.png" width="30" height="30" alt="logo" /> */}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item  ">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          {
            props.user ? (
              <li className="nav-item">
                <Link to={'/mypage/' + props.user._id} className="nav-link">
                  My Page
                </Link>
              </li>
            ) : null
            //   (
            //   <li className="nav-item">
            //   <Link to ={"/"} className="nav-link" >Not Available</Link>
            // </li>
            //   )
          }
        </ul>
        {props.user ? (
          <div className="float-right greeting">
            {greeting} !
            <button className="btn ml-5 logout" onClick={props.logout}>
              <i className="fa fa-eject mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <div className="float-right greeting">{greeting} !</div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
