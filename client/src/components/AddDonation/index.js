import React, { useState, useContext, useEffect } from 'react';
import CountUp from 'react-countup';
import ChallengeContext from '../../utils/ChallengeContext';
import './AddDonation.scss';

//Overall amount of donations, calculated by adding all finished challenges and the donation amount
function AddDonation() {
  const { challenges } = useContext(ChallengeContext);
  const [donation, setDonation] = useState(0);

  useEffect(() => {
    getDonation();
  }, [challenges]);

  const getDonation = () => {
    let donationAmount = 0;
    challenges.map((challenge) => {
      if (challenge.status === 'finish')
        donationAmount += challenge.donatedAmount;
    });
    setDonation(donationAmount);
  };
  //Using count up to show animation for displaying donation amount
  return (
    <div>
      <h5 style={{ textAlign: 'center', marginBottom: '0' }}>
        <CountUp duration={4} prefix="$" end={donation} />
      </h5>
    </div>
  );
}

export default AddDonation;
