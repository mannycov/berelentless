import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Moment from 'react-moment';
import moment from 'moment'

class CheckInChart extends Component {
  state = {
    options: {
      responsive: true,
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }
  render() {
    const { checkins, goal } = this.props;
    const checkInDates = checkins.map(checkin => moment(checkin.date).format('L'));
    let datasets;

    if (goal.category === 'Strength') {
      const weight = checkins.map(checkin => checkin.weight);
      const reps = checkins.map(checkin => checkin.reps);
      const weightData = {
        label: 'Weight',
        data: weight,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y-axis-1'
      }
       const repsData = {
        label: 'Reps',
        data: reps,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        type: 'line',
        yAxisID: 'y-axis-2'
      }
      datasets = [weightData, repsData];
    } else if (goal.category === 'Conditioning') {
      const minutes = checkins.map(checkin => checkin.minutes);
      const seconds = checkins.map(checkin => checkin.seconds);
      const minutesData = {
        label: 'Minutes',
        data: minutes,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y-axis-1'
      }
      const secondsData = {
        label: 'Seconds',
        data: seconds,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        type: 'line',
        yAxisID: 'y-axis-2'
      }
      datasets = [minutesData, secondsData];
    } else if (goal.category === 'Habit') {
      const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      const days = range(1, checkins.length, 1);
      const habitData = {
        label: 'Days',
        data: days,
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }
      datasets = [habitData];
    }

    const chartData = {
      labels: checkInDates,
      datasets
    };

    return (
      <div>
        <h4 className="mb-4">Progress Chart</h4>
        <Bar 
          data={chartData}
          options={this.state.options}
        />
      </div>
    )
  }
}

export default CheckInChart;
