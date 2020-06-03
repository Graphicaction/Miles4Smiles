import React, {useState, useContext, useEffect} from "react";
import CountUp from "react-countup";
import ChallengeContext from "../../utils/ChallengeContext";
import "./AddDonation.scss";

function AddDonation() {
    const { challenges } = useContext(ChallengeContext);
    const [donation, setDonation] = useState(0);
    
    console.log(challenges);

    useEffect(()=>{
        getDonation();
    },[challenges])

    const getDonation = () => {
        let donationAmount = 0;
        challenges.map(challenge => {
            if(challenge.status === "finish")
                donationAmount += challenge.donatedAmount;
        })
        setDonation(donationAmount);
        console.log(donation);
    }

    return (
        <div>
            <h3 style={{ textAlign: "center", marginBottom:"0"}}>
            <CountUp duration={3} prefix="$" end={donation}/></h3>
        </div>
  )
}

export default AddDonation;