import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import API from "../../utils/API";

const LineChart = (props) => { 
  // Setting our component's initial state
  const [milesData, setMilesData] = useState([]);
  const [loading, setLoading] = useState(false);
  // Load all RunningStats and store them with setRunningStats
  useEffect(() => {
    loadRunningStats();
  }, [loading]);

  // Loads all RunningStats and sets them to RunningStats
  function loadRunningStats() {
    API.getRunningStats()
      .then(res => {
        console.log("Line chart data", res.data.runningStats);
        setGraphData(res.data.runningStats);
      })
      .catch(err => console.log(err));
  };
  //Setting graph data array
  const setGraphData = (data) => {
    let graphData = [];
    if(data.length) {
      data.map(result => {
        graphData.push(result.distance);
      })
      //If no data for the day put 0
      for(let j = 0; j < 7; j++) {
        if(!graphData[j]) {
          graphData[j] = 0;
        }
      }
    setMilesData([...graphData]);
    setLoading(true);
    console.log("miles data in line chart ", milesData);
    }
  }
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
        data: milesData
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
