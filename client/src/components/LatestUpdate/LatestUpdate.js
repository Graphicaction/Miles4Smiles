import React, {useState, useContext, useEffect} from "react";
import ChallengeContext from "../../utils/ChallengeContext";

function LatestUpdate() {
    const { challenges } = useContext(ChallengeContext);
    // const [finishedChallenges, setFinishedChallenges]= useState([]);
    
    useEffect(()=>{
        console.log(challenges);
    },[challenges])

    let finishedChallenges=[];

    challenges.map(c =>{
        if (c.status==="finish"){
            finishedChallenges.push(c)
        }
        console.log(finishedChallenges)
    })

    return (
        <div>
            <ul>{
                finishedChallenges.map((challenge, i) => (
                  i<10 && 
                    <>
                    <li key={i}>{challenge.challengers[0]} and {challenge.challengers[1]} ran a {challenge.distance} mile race. {challenge.donor} lost and donated ${challenge.donatedAmount} to {challenge.businessName}. Thanks {challenge.donor}!</li>
                    <hr></hr>
                    </>
                ))
            }</ul>
        </div>
  )
}

export default LatestUpdate;



