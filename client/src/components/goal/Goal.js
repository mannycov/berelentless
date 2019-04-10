import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoalItem from '../goals/GoalItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getGoal } from '../../actions/goalActions';

class Goal extends Component {

  componentDidMount() {
    this.props.getGoal(this.props.match.params.id);
  }

  render() {
    const { goal, loading } = this.props.goal;
    let goalContent;

    if (goal === null|| loading || Object.keys(goal).length === 0) {
      goalContent = <Spinner />
    } else {
      goalContent = (
        <div>
          <GoalItem
            goal={goal}
            showActions={false}
          />
          <CommentForm goalId={goal._id} />
          <CommentFeed goalId={goal._id} comments={goal.comments} />
        </div>
      );
    }

    return (
      <div className="goal">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
              </Link>
              {goalContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Goal.propTypes = {
  getGoal: PropTypes.func.isRequired,
  goal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  goal: state.goal
});

export default connect(mapStateToProps, { getGoal })(Goal);
