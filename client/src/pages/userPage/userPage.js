import React, {Fragment} from "react";
import {Col, Row} from "../../components/Grid"
import RunningStats from "../RunningStats";
import {Card} from "../../components/Card"
import "./userPage.css"


const UserPage =(props) => {
//add personalized message later will need props and fragment import maybe easiest with Context
    // let greeting;
  
    // if (props.user === null) {
    //   greeting = <p>Hello guest</p>
    // } else if (props.user.firstName) {
    //   greeting = (
    //     <Fragment>
    //       Hello <strong>{props.user.firstName} ! Here is an overview of your latest runs and challenges.</strong>
    //     </Fragment>
    //   )
    // } else if (props.user.username) {
    //   greeting = (
    //     <Fragment>
    //       Hello <strong>{props.user.username} ! Here is an overview of your latest runs and challenges. </strong>
    //     </Fragment>
    //   )
    // } 

    
  return(
    <>
      {/* <h3 className="mt-5 mb-5 text-center"> Hello! We are glad you are back! Here is an overview of your latest runs and challenges.</h3> */}
      {/* <hr></hr> */}
    
  
      <RunningStats />
    </>
  )
}

export default UserPage;