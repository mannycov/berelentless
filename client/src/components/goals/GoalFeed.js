import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoalItem from './GoalItem';

class GoalFeed extends Component {
  render() {
    const { goals } = this.props;

    return goals.map(goal => <GoalItem key={goal._id} goal={goal} />);
  }
}

GoalFeed.propTypes = {
  goals: PropTypes.array.isRequired
};

export default GoalFeed;
