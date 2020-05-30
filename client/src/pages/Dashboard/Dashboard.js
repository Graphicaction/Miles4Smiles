import React, {useState, useEffect} from "react";
import "./Dashboard.css"
import BarChart from "../../components/BarChart";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import AddDonation from "../../components/AddDonation";
import ChallengeContext from "../../utils/ChallengeContext";
import API from "../../utils/API";

function Dashboard() {
  const [challenges, setChallenges] = useState([]);

  // Loads all Challenges and sets them to Challenges
  useEffect(() => {loadChallenges()},[])
  
  function loadChallenges() {
    API.getChallenges()
      .then(response => {
       setChallenges(response.data.challenges);
      })
      .catch(err => console.log(err));
      console.log(challenges);
  };
    return (
      <Container fluid>
        
          <Row>
          <Col size="md-6 sm-12">
            <Card title="Challenges">
              <BarChart />
              {/* needs to call the graph that shows overall miles ran similar to budget tracker adding on*/}
            </Card>
          </Col>
          
          <Col size="md-6 sm-12">
            <Card title="Donation to Local Businesses">
              <BarChart />
              {/* needs to call the graph that shows overall money that was donated similar to budget tracker */}
            </Card>
          </Col>
          
        </Row>

        <Row>
         <Col  fluid size="md-6 sm-6">
          <Card title="Recently Supported Local Businesses">
              {/* dynamically render all businesses that were previously selected in challenges */}
              <ul>
                <li>Bos's Burger, Apex, NC, website</li>
                <li>Lena's Lemons, Cary, NC, website </li>
                <li>Rashmi's Radish, Durham, website</li>
                <li>Rachel's Ramen, Chapel Hill, website</li>
              </ul>
            </Card>
          </Col>
          <Col size="md-6 sm-6">
            <Card title="Overall Donation Amount " >
              <ChallengeContext.Provider value={{challenges}}>
                <AddDonation /> 
              </ChallengeContext.Provider>
            </Card>
          </Col>
          </Row>

    </Container>
    );
  }


export default Dashboard;
