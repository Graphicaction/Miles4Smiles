import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import Jumbotron from "../../components/Jumbotron/Jumbotron"
import {Card} from "../../components/Card"
import { Row, Col } from "../../components/Grid"


const Welcome = () =>{
  return(
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
  )
}

export default Welcome;

