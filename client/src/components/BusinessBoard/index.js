import React, { useContext, useEffect } from 'react';
import ChallengeContext from '../../utils/ChallengeContext';

function BusinessBoard() {
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
      <ul className="fa-ul">
        {
          // Displaying up to 5 business names of businesses that were supported already in reverse order
          finishedChallenges
            .slice(0)
            .reverse()
            .map(
              (challenge, i) =>
                i < 5 && (
                  <div key={challenge._id}>
                    <li>
                      <i className="fa fa-dollar-sign" />
                      <img
                        src={challenge.businessType}
                        height="20px"
                        width="20px"
                        alt="businessIcon"
                      />{' '}
                      <a
                        className="businessUrl"
                        href={challenge.businessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {challenge.businessName}
                      </a>{' '}
                      located at {challenge.businessLocation}
                    </li>
                    <hr></hr>
                  </div>
                )
            )
        }
      </ul>
    </div>
  );
}

export default BusinessBoard;
