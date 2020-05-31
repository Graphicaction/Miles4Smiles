import React, {useState, useEffect} from "react";
import "./Dashboard.css"
import BarChart from "../../components/BarChart";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import AddDonation from "../../components/AddDonation";
import BusinessBoard from "../../components/BusinessBoard";
import ChallengeContext from "../../utils/ChallengeContext";
import API from "../../utils/API";

function Dashboard() {
  const [challenges, setChallenges] = useState([]);
  const [distanceData, setDistanceData] = useState([]);

  // Loads all Challenges and sets them to Challenges
  useEffect(() => {loadChallenges()},[])
  
  function loadChallenges() {
    let allChallenges,dData = [];
    API.getChallenges()
      .then(response => {
        allChallenges = response.data.challenges;
        allChallenges.map(challenge => {
          dData.push(challenge.distance);
        })
        setChallenges(allChallenges);
        setDistanceData(dData);
        console.log(allChallenges[0].distance, distanceData);
      })
      .catch(err => console.log(err));
  };
    return (
      <Container fluid>
        
          <Row>
          <Col size="md-6 sm-12">
            <Card title="Challenges">
              { (distanceData) ? (<BarChart data={distanceData} label="Challenges Completed" yLabelString="Km" xLabelString="Number of Challenges" />) : <h3>No challenges recorded yet</h3>
              }
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
              <ChallengeContext.Provider value={{challenges}}>
                {challenges ? <BusinessBoard /> : <h3>No challenges recorded yet</h3>
                }
              </ChallengeContext.Provider>
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
