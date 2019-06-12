import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { getGoals } from '../../actions/goalActions';
import Spinner from '../common/Spinner';
import GoalForm from '../goals/GoalForm';
import GoalItem from '../goals/GoalItem';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getGoals();
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let { goals } = this.props.goal;
    let dashboardContent;
    goals = goals.filter(goal => goal.user === user.id);

    if (profile === null || loading === true) {
      dashboardContent = <Spinner />
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link>
            </p>
            <ProfileActions />
            <GoalForm />
            {goals.length > 0 ? <h1 className="display-4 text-center">My Goals</h1> : null}
            <div style={{margin: 'auto', width: '50%'}}>
              {goals.map(goal => <GoalItem key={goal._id} goal={goal} /> )}
            </div>
            
            <div style={{ marginBottom: '30px' }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger mb-5">Delete My Account</button>
          </div>
        );
      } else {
        // User is logged in with no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You must set up a profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-primary">
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getGoals: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  goal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  goal: state.goal
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getGoals })(Dashboard);
