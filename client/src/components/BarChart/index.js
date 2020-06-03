import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = (props) => { 
  
  const state = {
    labels: [1,2,3,4,5,6,7],
    //maybe rather have distances on x axis and render from data and have time one y axis and render from data?
    datasets: [
      {
        label: props.label,
        fill: false,
        // lineTension: 0.5,
        backgroundColor: [
          '#6b7a8f',
          '#f7c331',
        ],
        borderColor: '#6b7a8f',
        borderWidth: 2,
        data: props.data
      }
    ]
  }

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
                  suggestedMin: 0,
                  suggestedMax: 42
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
