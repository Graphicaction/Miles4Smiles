import React, {Fragment} from "react";
import RunningStats from "../../components/RunningStats/RunningStats";
import "./MyPage.css"


const MyPage =(props) => {
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
     
  
      <RunningStats />
    </>
  )
}

export default MyPage;