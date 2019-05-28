import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteGoal, addLike, removeLike } from '../../actions/goalActions';
import Moment from 'react-moment';

class GoalItem extends Component {
  onDeleteClick = id => {
    this.props.deleteGoal(id);
  }

  onLikeClick = id => {
    this.props.addLike(id);
  }

  onUnlikeClick = id => {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    const {
      goal,
      auth,
      showActions
    } = this.props;
    const { profile } = this.props.profile;
    let goalMetrics;
    let profilePhoto;

    if (profile.photo) {
      profilePhoto = `/public/uploads/${profile.photo}`;
    } else {
      profilePhoto = goal.avatar;
    }

    if (goal.category === 'Strength') {
      goalMetrics = (
        <div>
          <h6 className="card-subtitle">Target</h6>
          <p className="lead">{goal.weightTarget ? goal.weightTarget : null} lbs. {goal.repTarget ? goal.repTarget : null} reps</p>
        </div>
      );
    } else if (goal.category === 'Conditioning') {
      goalMetrics = (
        <div>
          <h6 className="card-subtitle">Target</h6>
          <p className="lead">{goal.minutes ? goal.minutes : '00'}:{goal.seconds ? goal.seconds : '00'}</p>
        </div>
      );
    } else if (goal.category === 'Habit') {
      goalMetrics = (
        <div>
          <h6 className="card-subtitle">Target</h6>
          {goal.days ? <p className="lead">{goal.days} Days</p> : null}
        </div>
      )
    }

    return (
      <div className="card card-body mb-3 bg-light" style={{width: '24rem'}}>
        <div className="row">
          <div>
            <a href="profile.html">
              <img
                className="rounded-circle"
                src={profilePhoto}
                alt="profile-img"
                style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '80%'}}
              />
            </a>
            <br />
            <p className="text-center">{goal.name}</p>
          </div>
          <div className="col-md-10">
            <h5 className="card-title">{goal.title}</h5>
            <h6 className="card-subtitle">{goal.category}</h6>
            <br/>
            <Moment format="MM/DD/YYYY">{goal.from}</Moment> -{' '}
            <Moment format="MM/DD/YYYY">{goal.to}</Moment>
            <br/>
            <br/>
            {goalMetrics}
            {showActions ?
              (
              <span>
              <button onClick={() => this.onLikeClick(goal._id)} type="button" className="btn btn-light mr-1">
              <i className={classnames('fas fa-thumbs-up', {
                'text-info': this.findUserLike(goal.likes)
              })} />
              <span className="badge badge-light">{goal.likes.length}</span>
            </button>
            <button onClick={() => this.onUnlikeClick(goal._id)} type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>
            <Link to={`/goal/${goal._id}`} className="btn btn-primary mr-1">
              View
            </Link>
            {goal.user === auth.user.id ? (
              <button onClick={() => this.onDeleteClick(goal._id)} type="button" className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>
            ) : null}
            </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

GoalItem.defaultProps = {
  showActions: true
}

GoalItem.propTypes = {
  deleteGoal: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  goal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { deleteGoal, addLike, removeLike })(GoalItem);
