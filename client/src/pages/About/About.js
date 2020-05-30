import React from "react";
import {Card} from "../../components/Card"
import {Row, Col} from "../../components/Grid"

const About = () =>{
  return(
    <>
    <Row>
      <Col size="3">
        <Card title="How to use this App">
          <div className="card-body">This is how</div>
        </Card>
      </Col>
      <Col size="3">
        <Card title="How to use this App">
          <div className="card-body">This is how</div>
        </Card>
      </Col>
      <Col size="3">
        <Card title="How to use this App">
          <div className="card-body">This is how</div>
        </Card>
      </Col>
      <Col size="3">
        <Card title="How to use this App">
          <div className="card-body">This is how</div>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default About;