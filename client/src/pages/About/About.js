import React from 'react';
import { Card } from '../../components/Card';
import { Row, Col, Container } from '../../components/Grid';
import AboutJumbotron from '../../components/Jumbotron/AboutJumbotron';
import Developers from '../../components/Developers/Developers';
import './About.scss';

const About = () => {
  return (
    <>
      <AboutJumbotron />

      <span className="msg-icon">So nice</span>

      <Row className="mb-5">
        <Col size="sm-12 md-6 lg-3">
          <Card title="Getting Started">
            <div className="card-body-about">
              Setup a Miles4Smiles account to get started. You can even use M4S
              to log your race times.
            </div>
          </Card>
        </Col>
        <Col size="sm-12 md-6 lg-3">
          <Card title="Challenge Users to Support Local Businesses ">
            <div className="card-body-about">
              Click the "Challenge" button to compete against a friend or any
              other M4S user. Here you'll choose a distance to race and the
              lucky local business to support.
            </div>
          </Card>
        </Col>
        <Col size="sm-12 md-6 lg-3">
          <Card title="RUN for your local business">
            <div className="card-body-about">
              If accepted, each challenger must run the selected distance.
              Remember-- the slower runner pays up! GO GO GO!
            </div>
          </Card>
        </Col>
        <Col size="sm-12 md-6 lg-3">
          <Card title="Log Outcome - Loser Donates">
            <div className="card-body-about">
              After running, log the faster competitor as the winner! The
              challenger who lost will be redirected to the business's website
              to make their donation.
            </div>
          </Card>
        </Col>
      </Row>

      <div className="container-fluid devInfo">
        <Row fluid>
          <h5 className="text-center">The Developers</h5>
          <hr></hr>
        </Row>
        <div className="row justify-content-center">
          <Developers />
        </div>
      </div>
    </>
  );
};

export default About;
