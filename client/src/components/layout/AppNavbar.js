import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';


class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogoutClick = e => {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logOutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // Set the profile photo variable
    const userPhoto = user.avatar;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Goal Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="nav-link" onClick={this.onLogoutClick} href="#">
            <img className="profile-photo profile-nav" src={userPhoto} alt={user.name} title="You must upload a photo or have a Gravatar connected to your email to display an image" />{' '}
            Log Out
          </a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Log In
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://github.com/mannycov/beactive" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            BeRelentless
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Fintness Pursuers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { logOutUser, clearCurrentProfile })(AppNavbar);
