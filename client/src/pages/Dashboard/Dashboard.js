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
  // Loads all Challenges and sets them to Challenges
  useEffect(() => {
    loadChallenges();
  }, []);

  function loadChallenges() {
    let allChallenges = [],
      dData = [];
    let moneyData = [];
    API.getChallenges()
      .then((response) => {
        allChallenges = response.data.challenges;
        //Adding distances into an array
        allChallenges.map((challenge) => {
          dData.push(challenge.distance);
          if (challenge.status === 'donated')
            moneyData.push(challenge.donatedAmount);
        });
        //Setting donation data, distance data and all challenges to pass to child components
        setDonationData(moneyData);
        setChallenges(allChallenges);
        setDistanceData(dData);
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
                data={distanceData}
                label="Challenge"
                yAxesTick=""
                yAxesMax="20"
                yLabelString="Distance Run (Mi)"
                xLabelString="Recent Challenges"
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
                data={donationData}
                label="Donations Completed"
                yAxesTick="$"
                yAxesMax="100"
                yLabelString="Money Donated (USD)"
                xLabelString="Recently Completed Challenges"
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
