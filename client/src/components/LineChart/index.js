import React from 'react';
import {Line} from 'react-chartjs-2';

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
      data: [15, 20, 10, 11, 5, 12]
    }
  ]
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Daily running data',
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
}
