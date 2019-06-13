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
  state = {
    show: false
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getGoals();
  }

  showModal = () => {
    this.setState({ show: true });
  }

  closeModal = () => {
    this.setState({ show: false });
  }

  onDeleteClick = () => {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let { goals } = this.props.goal;
    const showHideClassName = this.state.show ? 'modal display-block' : 'modal display-none'; 
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

            {/* Delete account Modal */}
            <div className={showHideClassName}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Account</h5>
                    <button type="button" onClick={this.closeModal} className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete your account?</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" onClick={this.onDeleteClick} className="btn btn-danger">Delete</button>
                    <button type="button" onClick={this.closeModal} className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '30px' }} />
            <button className="btn btn-danger mb-5" type="button" onClick={this.showModal}>Delete My Account</button>
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
