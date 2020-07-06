import React from 'react';
import { Card } from '../../components/Card';
import { Row } from '../../components/Grid';
import AboutJumbotron from '../../components/Jumbotron/AboutJumbotron';
import Developers from '../../components/Developers/Developers';
import { SVG1, SVG2, SVG3, SVG4 } from '../../components/SVGs';
import './About.scss';

const About = () => {
  return (
    <>
      <AboutJumbotron />

      <Row className="mb-5">
        <div className="col-sm-12 col-md-6 col-lg-3 c1 text-center mt-5">
          <Card title="Getting Started">
            <div className="card-body-about ">
              Setup a Miles4Smiles account to get started. You can even use M4S
              to log your race times.
            </div>
          </Card>
          <SVG1 />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 c2 text-center mt-5">
          <Card title="Challenge Users to Support Businesses ">
            <div className="card-body-about">
              Click the "Challenge" button to compete against a friend or any
              other M4S user. Here you'll choose a distance to race and the
              lucky local business to support.
            </div>
          </Card>
          <SVG2 />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 c3 text-center mt-5">
          <Card title="RUN for your local business">
            <div className="card-body-about">
              If accepted, each challenger must run the selected distance.
              Remember-- the slower runner pays up! GO GO GO!
            </div>
          </Card>
          <SVG3 />
        </div>

        <div className="col-sm-12 col-md-6 col-lg-3 c4 text-center mt-5">
          <Card title="Log Outcome - Loser Donates" className="mt-0">
            <div className="card-body-about">
              After running, log the faster competitor as the winner! The
              challenger who lost will be redirected to the business's website
              to make their donation.
            </div>
          </Card>
          <SVG4 />
        </div>
      </Row>

      <div className="container-fluid devInfo">
        <Row fluid>
          <h5 className="text-center devHeader">The Developers</h5>
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
