import React, {useState, useContext, useEffect} from "react";
import ChallengeContext from "../../utils/ChallengeContext";

function BusinessBoard() {
    const { challenges } = useContext(ChallengeContext);
    const [business, setBusiness] = useState("");
    
    useEffect(()=>{
        console.log(challenges);
    },[challenges])

    return (
        <div>
            <ul>{
                challenges.map((challenge,i) => (i<5 && 
                <>
                    <li key={challenge._id}>{challenge.businessName}</li>
                    <hr></hr>
                </>))
            }</ul>
        </div>
  )
}

export default BusinessBoard;