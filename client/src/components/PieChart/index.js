import React, {Component,useState, useContext} from 'react';
import {Pie} from 'react-chartjs-2';
import UserContext from "../../utils/UserContext";

const PieChart = () => {
	const { user } = useContext(UserContext);
	let wonData, lostData;
	//converting db data into percentage 
	if(user!= null) { 
		const total = user.challengesWon + user.challengesLost;
		wonData = (user.challengesWon * 100)/total;
		lostData = (user.challengesLost * 100)/total;
	} else
	{
		wonData = 0;
		lostData = 0;
	}
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
		  {(user.challengesWon===0 && user.challengesLost===0) ? <p className="text-center"> No challenges completed yet!</p> : <Pie data={data} /> }
		</div>
    );
  
};

export default PieChart;