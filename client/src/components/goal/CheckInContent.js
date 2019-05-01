import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteCheckIn } from '../../actions/goalActions';

 class CheckInContent extends Component {
   onDeleteClick = (goalId, checkInId) => {
    this.props.deleteCheckIn(goalId, checkInId);
   };
  render() {
    const {
      checkins,
      goal,
      goalId,
      auth
    } = this.props;
    const checkInData = checkins.map(checkin => (
      <tr key={checkin._id}>
        <td>{goal.category === 'Strength' ? checkin.weight : checkin.minutes}</td>
        <td>{goal.category === 'Strength' ? checkin.reps : checkin.seconds}</td>
        <td><Moment format="MM/DD/YYYY">{checkin.date}</Moment></td>
        <td>
          {checkin.user === auth.user.id ? (
            <button
              onClick={() => this.onDeleteClick(goalId, checkin._id)}
              type="button"
              className="btn btn-danger mr-1">
              <i className="fas fa-times" />
            </button>
          ) : null}
        </td>
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
              <th>Date</th>
              <th />
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
  goal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteCheckIn })(CheckInContent);
