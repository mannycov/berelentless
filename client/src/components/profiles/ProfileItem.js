import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    // Set the profile photo variable
    const userPhoto = profile.user.avatar;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={userPhoto} alt="profile" className="profile-photo profile-item" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-primary">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Interests</h4>
            <ul className="list-group">
              {profile.interests.slice(0, 4).map((interest, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
