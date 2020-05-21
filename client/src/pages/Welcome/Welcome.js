import React from "react";
import Jumbotron from "../../components/Jumbotron/Jumbotron"


const Welcome = () =>{
  return(
    <>
    <Jumbotron>
      <div className="container">
      <h1>Nice to see you again..welcome message for logged in users who don't sign up for the first time</h1>
      </div>
    </Jumbotron>

    </>

  )
}

export default Welcome;

