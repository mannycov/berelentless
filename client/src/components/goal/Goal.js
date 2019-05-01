import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoalItem from '../goals/GoalItem';
import CheckInForm from './CheckInForm';
import CheckInChart from './CheckInChart';
import CheckInContent from './CheckInContent';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getGoal } from '../../actions/goalActions';

class Goal extends Component {

  componentDidMount() {
    this.props.getGoal(this.props.match.params.id);
  }

  render() {
    const { auth } = this.props;
    const { goal, loading } = this.props.goal;
    const checkins = goal.checkins;
    let goalContent;

    if (goal === null|| loading || Object.keys(goal).length === 0) {
      goalContent = <Spinner />
    } else if (goal.user === auth.user.id) {
      goalContent = (
        <div>
          <GoalItem goal={goal} showActions={false} />
          <CheckInChart goal={goal} checkins={checkins} />
          <CheckInContent goal={goal} goalId={goal._id} checkins={checkins} />
          <CheckInForm goalId={goal._id} />
          <CommentForm goalId={goal._id} />
          <CommentFeed goalId={goal._id} comments={goal.comments} />
        </div>
      )
    }
     else {
      goalContent = (
        <div>
          <GoalItem goal={goal} showActions={false} />
          <CheckInChart goal={goal} checkins={checkins} />
          <CheckInContent goal={goal} goalId={goal._id} checkins={checkins} />
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
  goal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  goal: state.goal,
  auth: state.auth
});

export default connect(mapStateToProps, { getGoal })(Goal);
