import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoalItem from './GoalItem';

class GoalFeed extends Component {
  render() {
    const { goals } = this.props;

    return (
      <div style={{margin: 'auto', width: '50%'}}>{ goals.map(goal => <GoalItem key={goal._id} goal={goal} />)}</div>
    )
  }
}

GoalFeed.propTypes = {
  goals: PropTypes.array.isRequired
};

export default GoalFeed;
