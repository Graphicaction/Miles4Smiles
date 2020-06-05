import React, { useContext, useEffect} from "react";
import ChallengeContext from "../../utils/ChallengeContext";

function LatestUpdate() {
    const { challenges } = useContext(ChallengeContext);
    
    useEffect(()=>{
        console.log(challenges);
    },[challenges])

    let finishedChallenges=[];

    challenges.map(c =>{
        if (c.status==="finish"){
            finishedChallenges.push(c)
        }
    })

    return (
        <div>
            <ul>{
                finishedChallenges.slice(0).reverse().map((challenge, i) => (
                //   (i<5) && 
                    <div key={i}>
                    <li>{challenge.challengers[0]} and {challenge.challengers[1]} ran a {challenge.distance} mile race. {challenge.donor} lost and donated ${challenge.donatedAmount} to {challenge.businessName}. Thanks {challenge.donor}!</li>
                    <hr></hr>
                    </div>
                ))
            }</ul>
        </div>
  )
}

export default LatestUpdate;



