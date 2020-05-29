import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import API from "../../utils/API";

const LineChart = (props) => { 
  
  const state = {
    labels: ['Sunday', 'Monday', 'Tuesday',
             'Wednesday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Running Stats',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: props.milesData
      }
    ]
  }

  return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              // text:'Daily running data',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }

export default LineChart;
