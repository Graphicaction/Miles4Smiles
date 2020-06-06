import React from "react";
import {Card} from "../../components/Card"
import {Row, Col} from "../../components/Grid"
import AboutJumbotron from "../../components/Jumbotron/AboutJumbotron";

const About = () =>{
  return(
    <>
    <AboutJumbotron/>
    <Row>
      <Col size="sm-12 md-6 lg-3">
        <Card title="Step 1: Register">
          <div className="card-body-about">Setup a Miles4Smiles account to get started. You can even use M4S to log your race times.</div>
        </Card>
      </Col>
      <Col size="sm-12 md-6 lg-3">
        <Card title="Step 2: Challenge">
          <div className="card-body-about">Click the "Challenge" button to compete against a friend or any other M4S user. Here you'll choose a distance to race and the lucky local business to support.</div>
        </Card>
      </Col>
      <Col size="sm-12 md-6 lg-3">
        <Card title="Step 3: Race">
          <div className="card-body-about">If accepted, each challenger must run the selected distance. Remember-- the slower runner pays up! GO GO GO!</div>
        </Card>
      </Col>
      <Col size="sm-12 md-6 lg-3">
        <Card title="Step 4: Donate">
          <div className="card-body-about">After running, log the faster competitor as the winner! The challenger who lost will be redirected to the business's website to make their donation.</div>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default About;