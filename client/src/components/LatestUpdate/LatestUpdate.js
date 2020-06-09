import React, { useContext, useEffect } from 'react';
import ChallengeContext from '../../utils/ChallengeContext';

// appears in second row on welcome page and sums up the latest 5 activities- donations made to what businesses
function LatestUpdate() {
  const { challenges } = useContext(ChallengeContext);

  useEffect(() => {
  }, [challenges]);

  let finishedChallenges = [];
  //getting challenges with finish or donated status
  challenges.map((c) => {
    if (c.status === 'finish' || c.status === 'donated') {
      finishedChallenges.push(c);
    }
  });

  return (
    <div>
      <ul>
        {finishedChallenges
          .slice(0)
          .reverse()
          .map(
            (challenge, i) =>
              i < 5 && (
                <div key={i}>
                  <li>
                    {challenge.challengers[0]} and {challenge.challengers[1]}{' '}
                    ran a {challenge.distance} mile race. {challenge.donor} lost
                    and donated ${challenge.donatedAmount} to{' '}
                    <a
                      href={challenge.businessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {challenge.businessName}
                    </a>
                    . Thanks {challenge.donor}!
                  </li>
                  <hr></hr>
                </div>
              )
          )}
      </ul>
    </div>
  );
}

export default LatestUpdate;
