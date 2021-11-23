import React, { useEffect } from 'react';
import zoneTemperature from '../Data/ZonAnn.Ts+dSST.csv';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// data from : https://data.giss.nasa.gov/gistemp/
const Tabular = () => {
  useEffect(() => {
    const getData = async () => {
      const xlables = [];
      const xtemp = [];
      const response = await fetch(zoneTemperature);
      const text = await response.text();
      // console.log(text);
      // split by line break and remove first array
      const table = text.split('\n').slice(1);
      table.forEach((row) => {
        const cols = row.split(',');
        const year = cols[0];
        xlables.push(year);
        const temp = cols[1];
        xtemp.push(parseFloat(temp) + 14);
        console.log(year, temp);
      });
      return { xlables, xtemp };
    };
    const chartIt = async () => {
      const data = await getData();
      const ctx = document.getElementById('chart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.xlables,
          datasets: [
            {
              label:
                'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
              data: data.xtemp,
              fill: false,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return value + ' C°';
                },
              },
            },
          },
        },
      });
    };
    chartIt();
  }, []);
  return (
    <div style={{ height: 400, width: 800 }}>
      hello data
      <canvas id='chart' width='200' height='400'></canvas>
    </div>
  );
};

export default Tabular;
