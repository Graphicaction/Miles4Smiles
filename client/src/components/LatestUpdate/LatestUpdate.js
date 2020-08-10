import React, { useContext, useEffect } from 'react';
import ChallengeContext from '../../utils/ChallengeContext';
import './LatestUpdate.scss';

// appears in second row on welcome page and sums up the latest 5 activities- donations made to what businesses
function LatestUpdate() {
  const { challenges } = useContext(ChallengeContext);

  useEffect(() => {}, [challenges]);

  let finishedChallenges = [];
  //getting challenges with finish or donated status
  challenges.forEach((c) => {
    // if (c.status === 'finish' || c.status === 'donated') {
    if (c.status === 'donated') {
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
                  <li className="fa-ul">
                    <i className="fa fa-check-circle mr-2"></i>
                    {challenge.challengers[0]} and {challenge.challengers[1]}{' '}
                    ran a {challenge.distance} mile race. {challenge.donor} lost
                    and donated ${challenge.donatedAmount} to{' '}
                    <a
                      className="businessUrl"
                      href={challenge.businessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {challenge.businessName}
                    </a>
                    . Thanks {challenge.donor}!
                  </li>
                  <hr className="boardHr"></hr>
                </div>
              )
          )}
      </ul>
    </div>
  );
}

export default LatestUpdate;
