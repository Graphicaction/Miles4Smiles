import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

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

export default class App extends Component {
  render() {
    return (
      <div>
        <Pie data={data} />
      </div>
    );
  }
};