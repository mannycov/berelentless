import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    // Set the profile photo variable
    const userPhoto = profile.user.avatar;
    
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-primary text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="profile-photo" src={userPhoto} alt="profile" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              {isEmpty(profile.location) ? null : (<h5>{profile.location}</h5>)}
              <p>
                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a className="text-white p-2" href={`https://${profile.social.youtube}`} rel="noopener noreferrer" target="_blank">
                    <i className="fab fa-youtube fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a className="text-white p-2" href={`https://${profile.social.twitter}`} rel="noopener noreferrer" target="_blank">
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a className="text-white p-2" href={`https://${profile.social.facebook}`} rel="noopener noreferrer" target="_blank">
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a className="text-white p-2" href={`https://${profile.social.instagram}`} rel="noopener noreferrer" target="_blank">
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
