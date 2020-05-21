import React from "react";
import RunningStats from "../RunningStats";
import {Card} from "../../components/Card"


const UserPage =() => {
//add personalized message later will need props and fragment import
    // let greeting;
  
    //  if (props.user.firstName) {
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
      <h3 className="mt-5 mb-5 text-center"> We are glad you are back! Here is an overview of your latest runs and challenges.</h3>
      <hr></hr>
      <Card>
        Your Statistics
      </Card>
      <Card>
        Incoming Challenges
        {/* add list of all incoming challenges */}
      </Card>
      <Card>
        Find a User
        {/* user search option that redirects to that user cars */}
      </Card>
      <RunningStats />
    </>
  )
}

export default UserPage;