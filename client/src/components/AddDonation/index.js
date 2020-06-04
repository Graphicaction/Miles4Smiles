import React, {useState, useContext, useEffect} from "react";
import CountUp from "react-countup";
import ChallengeContext from "../../utils/ChallengeContext";
import "./AddDonation.scss";

function AddDonation() {
    const { challenges } = useContext(ChallengeContext);
    const [donation, setDonation] = useState(0);
    
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
    }
    //Using count up to show animation for displaying donation amount
    return (
        <div>
            <p style={{ textAlign: "center", marginBottom:"0"}}>
            <CountUp duration={4} prefix="$" end={donation}/></p>
        </div>
  )
}

export default AddDonation;