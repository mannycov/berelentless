import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    let profilePhoto;
    let photoClassName;

    if (profile.photoOrientation) {
      if (profile.photoOrientation === '2') photoClassName = "profile-photo mirror";
      if (profile.photoOrientation === '3') photoClassName = "profile-photo rotate-180";
      if (profile.photoOrientation === '4') photoClassName = "profile-photo rotate-180-mirror";
      if (profile.photoOrientation === '5') photoClassName = "profile-photo rotate-270-mirror";
      if (profile.photoOrientation === '6') photoClassName = "profile-photo rotate-90";
      if (profile.photoOrientation === '7') photoClassName = "profile-photo rotate-90-mirror";
      if (profile.photoOrientation === '8') photoClassName = "profile-photo rotate-270";
    } else photoClassName = "profile-photo"

    if (profile.photoLocation) profilePhoto = profile.photoLocation;
    else profilePhoto = profile.user.avatar;
    
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-primary text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className={photoClassName} src={profilePhoto} alt="profile-img" />
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
