import React, {useState, useContext, useEffect} from "react";
import ChallengeContext from "../../utils/ChallengeContext";

function BusinessBoard() {
    const { challenges } = useContext(ChallengeContext);
    
    return (
        <div>
            <ul>{
                // Displaying upto 5 business names 
                challenges.slice(0).reverse().map((challenge,i) => (i<5 && 
                <div key={challenge._id}>
                    <li>{challenge.businessName}</li>
                    <hr></hr>
                </div>))
            }</ul>
        </div>
  )
}

export default BusinessBoard;