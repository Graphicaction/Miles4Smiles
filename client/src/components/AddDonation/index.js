import React from "react";
import CountUp from "react-countup";
import ChallengeForm from "../../components/ChallengeForm/ChallengeForm";


function AddDonation(props) {
  console.log(props.name);
  return (
    
    <p style={{ textAlign: "center", marginBottom:"0"}}>
    <CountUp duration={3} prefix="$" end={566}/></p>
  )
}

export default AddDonation;