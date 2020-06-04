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
			'#2a9d8f',
			'#f7882f',
			],
			hoverBackgroundColor: [
			'#0ca08f',
			'#cc3e07',
			]
		}]
	};
  
    return (
      	<div>
		  {(user.challengesWon===0 && user.challengesLost===0) ? <h3> No challenges completed yet!</h3> : <Pie data={data} /> }
		</div>
    );
  
};

export default PieChart;