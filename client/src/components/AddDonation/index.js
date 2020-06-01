import React, {useState, useContext, useEffect} from "react";
import CountUp from "react-countup";
import ChallengeContext from "../../utils/ChallengeContext";

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
            <p style={{ textAlign: "center", marginBottom:"0"}}>
            <CountUp duration={3} prefix="$" end={donation}/></p>
        </div>
  )
}

export default AddDonation;