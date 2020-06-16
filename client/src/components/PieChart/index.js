import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import UserContext from '../../utils/UserContext';

const PieChart = () => {
  const { user } = useContext(UserContext);
  let wonData, lostData;
  //converting db data into percentage
  if (user != null) {
    const total = user.challengesWon + user.challengesLost;
    wonData = Math.floor((user.challengesWon * 100) / total);
    lostData = Math.floor((user.challengesLost * 100) / total);
  } else {
    wonData = 0;
    lostData = 0;
  }
  const data = {
    labels: ['Challenges Won', 'Challenges Lost'],
    datasets: [
      {
        data: [wonData, lostData],
        backgroundColor: ['#7686b1', '#f5a248'],
        hoverBackgroundColor: ['#8794a6', '#f7882f'],
        borderColor: '#606e81',
      },
    ],
  };

  return (
    <div>
      {user.challengesWon === 0 && user.challengesLost === 0 ? (
        <h5 className="text-center"> No challenges completed yet!</h5>
      ) : (
        <Pie data={data} />
      )}
    </div>
  );
};

export default PieChart;
