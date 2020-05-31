import React, {Fragment, useContext} from "react";
import RunningStats from "../../components/RunningStats/RunningStats";
import Jumbotron from "../../components/Jumbotron"
import "./MyPage.css";
import UserContext from "../../utils/UserContext";



const MyPage =() => {
  const { user } = useContext(UserContext);

    let greeting;
  
    if (user === null) {
      greeting = <p>Hello guest</p>
    } else if (user.firstName) {
      greeting = (
        <Fragment>
         <h4>Hello <strong>{user.firstName}, we are glad you are back  ! Here is an overview of your latest races and challenges.</strong></h4>
        </Fragment>
      )
    } else if (user.username) {
      greeting = (
        <Fragment>
          <h4>Hello <strong>{user.username}, we are glad you are back ! Here is an overview of your latest races and challenges. </strong></h4>
        </Fragment>
      )
    } 

    
  return(
    <>
    <div className="alert text-center" style={{background: "linear-gradient(#a2cabc, #ffe5d9)", borderBottom: "none"}}>{greeting}</div>
     <RunningStats />
    </>
  )
}

export default MyPage;