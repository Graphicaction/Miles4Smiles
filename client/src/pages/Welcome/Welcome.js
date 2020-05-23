import React, {useState, useEffect} from "react";
//import { Route} from 'react-router-dom';
import UserCard from "../../components/UserCard/UserCard";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import UserData from "../../components/UserData/UserData"
import {Card} from "../../components/Card"
import { Row, Col } from "../../components/Grid"


const Welcome = (props) =>{
  const [firstLogin, setFirstLogin] = useState(false);
  console.log(props.user);
  useEffect(()=>{
    if(props.user)
      setFirstLogin(props.user.firstLogin);
  });
  
  return(
    <div>
    { firstLogin && (
     <div>
       <UserData id={props.user._id} />
     </div>
    )}
    { !firstLogin && (
     
    //if it's a returning user display this
    <>
    <Jumbotron >
    <div className="container">
      <h1 className="display-4">Miles 4 Smiles </h1>
      <hr></hr>
      <h2>We are so excited you are back again and want to continue to support your local business!</h2>
    </div>
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

   <Card>
     List of most recent runs and businesses supported maybe using socket.io to post
   </Card>
   </>
     )}
    </div>
  )
}

export default Welcome;

