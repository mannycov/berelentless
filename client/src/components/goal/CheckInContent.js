import React, { Component } from 'react';
import PropTypes from 'prop-types';

 class CheckInContent extends Component {
  render() {
    const { checkins, goal } = this.props;
    const checkInData = checkins.map(checkin => (
      <tr key={checkin._id}>
        <td>{goal.category === 'Strength' ? checkin.weight : checkin.minutes}</td>
        <td>{goal.category === 'Strength' ? checkin.reps : checkin.seconds}</td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Check Ins</h4>
        <table className="table">
          <thead>
            <tr>
              <th>{goal.category === 'Strength' ? 'Weight' : 'Minutes'}</th>
              <th>{goal.category === 'Strength' ? 'Reps' : 'Seconds'}</th>
            </tr>
            {checkInData}
          </thead>
        </table>
      </div>
    )
  }
}

CheckInContent.propTypes = {
  checkins: PropTypes.array.isRequired,
  goal: PropTypes.object.isRequired
};

export default CheckInContent;
