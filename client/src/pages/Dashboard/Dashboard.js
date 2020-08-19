import React, { useState, useEffect } from 'react';
import './Dashboard.scss';
import BarChart from '../../components/BarChart';
import { Col, Row, Container } from '../../components/Grid';
import { Card } from '../../components/Card';
import AddDonation from '../../components/AddDonation';
import BusinessBoard from '../../components/BusinessBoard';
import ChallengeContext from '../../utils/ChallengeContext';
import API from '../../utils/API';

function Dashboard() {
  const [challenges, setChallenges] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const [business, setBusiness] = useState([]);
  // Loads all Challenges and sets them to Challenges
  useEffect(() => {
    loadChallenges();
  }, []);
  //On page mount get all challenge data and set the challenge context for child components to use
  function loadChallenges() {
    let allChallenges = [],
      dData = [];
    let allBusinesses = [];
    let moneyData = [];
    API.getChallenges()
      .then((response) => {
        allChallenges = response.data.challenges;
        //Adding distances into an array
        allChallenges
          .slice(0)
          .reverse()
          .map((challenge) => {
            if (
              // challenge.status === 'pending' ||
              challenge.status === 'donated'
            ) {
              dData.push(challenge.distance);
              allBusinesses.push(`${challenge.businessName.slice(0, 6)} ...`);
            }
            if (challenge.status === 'donated')
              moneyData.push(challenge.donatedAmount);
          });

        for (let i = 0; i < 7; i++) {
          if (!allBusinesses[i]) {
            allBusinesses[i] = '';
          }
        }
        //Setting donation data, distance data and all challenges to pass to child components
        setDonationData(moneyData);
        setChallenges(allChallenges);
        setDistanceData(dData);
        setBusiness(allBusinesses);
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container fluid>
      <Row fluid>
        <Card title="Overall Amount Of Financial Support For Local Businesses">
          <ChallengeContext.Provider value={{ challenges }}>
            {challenges.length > 0 ? (
              <AddDonation />
            ) : (
              <p className="text-center">No challenges recorded yet</p>
            )}
          </ChallengeContext.Provider>
        </Card>
      </Row>

      <Row>
        <Col size="md-6 sm-12">
          <Card title="The Distance M4S Runners Go For Our Community">
            {distanceData ? (
              <BarChart
                data={distanceData.slice(0, 7)}
                xTickLabel={business.slice(0, 7)}
                label="Challenge Miles"
                yAxesTick=""
                yAxesMax="20"
                yLabelString="Distance Run (Mi)"
                xLabelString="Supported Businesses"
              />
            ) : (
              <p className="text-center">No challenges recorded yet</p>
            )}
          </Card>
        </Col>

        <Col size="md-6 sm-12">
          <Card title="Real Donations in Action">
            {donationData[0] !== 0 ? (
              <BarChart
                data={donationData.slice(0, 7)}
                xTickLabel={business.slice(0, 7)}
                label="Donations Completed"
                yAxesTick="$"
                yAxesMax="100"
                yLabelString="Money Donated (USD)"
                xLabelString="Supported Businesses"
              />
            ) : (
              <p className="text-center">No donations recorded yet</p>
            )}
          </Card>
        </Col>
      </Row>

      <Row>
        <Col fluid size="12">
          <Card title="Recently Supported Local Businesses">
            <ChallengeContext.Provider value={{ challenges }}>
              {challenges.length > 0 ? (
                <BusinessBoard />
              ) : (
                <p className="text-center">No businesses recorded yet</p>
              )}
            </ChallengeContext.Provider>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
