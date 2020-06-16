import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
  //Assigning custom props data
  const state = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        label: props.label,
        fill: false,
        backgroundColor: [
          '#7686b1',
          '#f5a248',
          '#7686b1',
          '#f5a248',
          '#7686b1',
          '#f5a248',
        ],
        borderColor: '#606e81',
        borderWidth: 2,
        data: props.data,
      },
    ],
  };
  //rendering bar chart
  return (
    <div>
      <Bar
        data={state}
        options={{
          responsive: true,
          legend: {
            display: true,
            position: 'top',
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value, index, values) {
                    return props.yAxesTick + value;
                  },
                  suggestedMin: 0,
                  suggestedMax: props.yAxesMax,
                },
                scaleLabel: {
                  display: true,
                  labelString: props.yLabelString,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: props.xLabelString,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarChart;
