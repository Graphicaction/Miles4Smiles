import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = (props) => { 
  //Assigning custom props data
  const state = {
    labels: [1,2,3,4,5,6,7],
    datasets: [
      {
        label: props.label,
        fill: false,
        // lineTension: 0.5,
        backgroundColor: [
          '#6b7a8f',
          '#f7882f',
          '#6b7a8f',
          '#f7882f',
          '#6b7a8f',
          '#f7882f',
        ],
        borderColor: '#6b7a8f',
        borderWidth: 2,
        data: props.data
      }
    ]
  }
  //rendering bar chart
  return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              fontSize:20
            },
            legend:{
              display:true,
              position:'top'
            },
            scales:{
              yAxes: [{
                ticks:{
                  callback: function(value, index, values) {
                    return props.yAxesTick + value;},
                  suggestedMin: 0,
                  suggestedMax: props.yAxesMax
                },
                scaleLabel: {
                  display: true,
                  labelString: props.yLabelString
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: props.xLabelString
                }
              }]
            }
          }}
        />
      </div>
    );
  }

export default BarChart;
