import React from "react";
import "./Dashboard.css"
import BarChart from "../../components/BarChart";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import CountUp from "react-countup";


function Dashboard() {

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
               <p style={{ textAlign: "center", marginBottom:"0"}}>
                 <CountUp duration={3} prefix="$" end={566}/></p>
            </Card>
          </Col>
          </Row>

    </Container>
    );
  }


export default Dashboard;
