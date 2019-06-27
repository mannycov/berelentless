import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    let profilePhoto;
    let photoClassName;

    if (profile.photoOrientation) {
      if (profile.photoOrientation === '2') photoClassName = "profile-photo profile-item mirror";
      if (profile.photoOrientation === '3') photoClassName = "profile-photo profile-item rotate-180";
      if (profile.photoOrientation === '4') photoClassName = "profile-photo profile-item rotate-180-mirror";
      if (profile.photoOrientation === '5') photoClassName = "profile-photo profile-item rotate-270-mirror";
      if (profile.photoOrientation === '6') photoClassName = "profile-photo profile-item rotate-90";
      if (profile.photoOrientation === '7') photoClassName = "profile-photo profile-item rotate-90-mirror";
      if (profile.photoOrientation === '8') photoClassName = "profile-photo profile-item rotate-270";
    } else photoClassName = "profile-photo profile-item"

    if (profile.photoLocation) profilePhoto = profile.photoLocation;
    else profilePhoto = profile.user.avatar;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profilePhoto} alt="profile-img" className={photoClassName}/>
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
