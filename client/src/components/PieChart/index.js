import React, {Component,useState, useContext} from 'react';
import {Pie} from 'react-chartjs-2';
import UserContext from "../../utils/UserContext";

const PieChart = () => {
	const { user } = useContext(UserContext);
	//converting db data into percentage 
	const total = user.challengesWon + user.challengesLost;
	const wonData = (user.challengesWon * 100)/total;
	const lostData = (user.challengesLost * 100)/total;
	const data = {
		labels: [
			'Challenges Won',
			'Challenges Lost'
		],
		datasets: [{
			data: [wonData, lostData],
			backgroundColor: [
			'#e1f6e7',
			'#f2ded6',
		
			],
			hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
	
			]
		}]
	};
  
    return (
      <div>
		<Pie data={data} />
      </div>
    );
  
};

export default PieChart;