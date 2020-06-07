import React, { useContext} from "react";
import ChallengeContext from "../../utils/ChallengeContext";

function BusinessBoard() {
    const { challenges } = useContext(ChallengeContext);
    
    return (
        <div>
            <ul>{
                // Displaying up to 5 business names of businesses that were supported already in reverse order
                challenges.slice(0).reverse().map((challenge,i) => (i<5 && 
                <div key={challenge._id}>
                    <li><img src={challenge.businessType} height="20px" width="20px" alt="businessIcon"/> <a href={challenge.businessUrl} target="_blank">{challenge.businessName}</a> located at {challenge.businessLocation}</li>
                    <hr></hr>
                </div>))
            }</ul>
        </div>
  )
}

export default BusinessBoard;