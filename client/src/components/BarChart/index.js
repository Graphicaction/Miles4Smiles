import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import API from "../../utils/API";

const BarChart = (props) => { 
  
  const state = {
    labels: [1,2,3,4,5,6,7],
    //maybe rather have distances on x axis and render from data and have time one y axis and render from data?
    datasets: [
      {
        label: 'Races Completed',
        fill: false,
        // lineTension: 0.5,
        backgroundColor: '#89b0ae',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: props.milesData
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
              // text:'Daily running data',
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
                  labelString: "Km"
                }
              }],
              xAxes: [{
               
                scaleLabel: {
                  display: true,
                  labelString: "Number of Races"
                }
              }]
            }
          
          }}
        />
      </div>
    );
  }

export default BarChart;
