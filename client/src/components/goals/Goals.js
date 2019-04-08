import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoalForm from './GoalForm';
import GoalFeed from './GoalFeed';
import Spinner from '../common/Spinner';
import { getGoals } from '../../actions/goalActions';

class Goals extends Component {
  componentDidMount() {
    this.props.getGoals();
  }

  render() {
    const { goals, loading } = this.props.goal;
    let goalContent;

    if (goals === null || loading) {
      goalContent = <Spinner />
    } else {
      goalContent = <GoalFeed goals={goals} />
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <GoalForm />
              {goalContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Goals.propTypes = {
  getGoals: PropTypes.func.isRequired,
  goal: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  goal: state.goal
});

export default connect(mapStateToProps, { getGoals })(Goals);
