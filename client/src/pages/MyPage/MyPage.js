import React, {Fragment, useContext} from "react";
import RunningStats from "../../components/RunningStats/RunningStats";
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
         Hello <strong>{user.firstName}, we are glad you are back  ! Here is an overview of your latest races and challenges.</strong>
        </Fragment>
      )
    } else if (user.username) {
      greeting = (
        <Fragment>
          Hello <strong>{user.username}, we are glad you are back ! Here is an overview of your latest races and challenges. </strong>
        </Fragment>
      )
    } 

    
  return(
    <>
    <div className="alert alert-secondary text-center">{greeting}</div>
     <RunningStats />
    </>
  )
}

export default MyPage;