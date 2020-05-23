import React, {useState, useEffect} from "react";
//import { Route} from 'react-router-dom';
import UserCard from "../../components/UserCard/UserCard";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import PostSignUpUserData from "../../components/PostSignUpUserData/PostSignUpUserData"
import {Card} from "../../components/Card"
import { Row, Col } from "../../components/Grid"


const Welcome = (props) =>{
  const [firstLogin, setFirstLogin] = useState(false);
  console.log(props.user);
  useEffect(()=>{
    if(props.user)
      setFirstLogin(props.user.firstLogin);
  });

  // do we need that as second argument?, [props.user]
  
  return(
    <div>
    { firstLogin && (
     <div>
       <PostSignUpUserData id={props.user._id} />
     </div>
    )}
    { !firstLogin && (
     
    //if it's a returning user display this
    <div>
    <Jumbotron >
    {/* <div className="container"> */}
      <h2 className="display-4">Miles 4 Smiles </h2>
      <hr></hr>
      <h3>We are so excited you are back again and want to continue to support your local business!</h3>
      <h3>Select a user close to your location and start a challenge!</h3>
    {/* </div> */}
   </Jumbotron>
   <Row>
     <Col size="md-3">
     <UserCard />
     </Col>

     <Col size="md-3">
     <UserCard />
     </Col>

     <Col size="md-3">
     <UserCard />
     </Col>

     <Col size="md-3">
     <UserCard />
     </Col>

   </Row>

   <Row>
     {/* <Col size="md-6 sm-12">
      <Card title="Find a User by Username">
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search User" aria-label="Search"/>
            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
          </form>
      </Card>
    </Col> */}

    <Col size="md-12 sm-12">
      <Card title="Latest Updates">
        {/* dynamically render the last challenges that occurred */}
        <ul>
          <li>Bob won against Sue and sue donated 34$ to Faulisi</li><hr></hr>
          <li>Bob won against Sue and sue donated 34$ to Faulisi</li><hr></hr>
          <li>Bob won against Sue and sue donated 34$ to Faulisi</li><hr></hr>
        </ul>
      </Card>
    </Col>
    </Row>
   </div>
     )}
  </div>
  )
}

export default Welcome;

