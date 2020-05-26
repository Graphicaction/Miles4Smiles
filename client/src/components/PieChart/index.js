import React, {Component,useState, useContext} from 'react';
import {Pie} from 'react-chartjs-2';
import UserContext from "../../utils/UserContext";

const PieChart = () => {
	const { user } = useContext(UserContext);
	console.log("Context from Piechart", user);
	const data = {
		labels: [
			'Challenges Won',
			'Challenges Lost'
		],
		datasets: [{
			data: [60, 40],
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