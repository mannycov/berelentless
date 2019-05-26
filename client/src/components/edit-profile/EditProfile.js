import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    photo: '',
    location: '',
    interests: '',
    bio: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: '',
    errors: {}
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring interests array back to CSV
      const interestsCSV = profile.interests.join(',');

      // If profile field doesn't exist, turn into empty string
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

      // Social media
      profile.social = !isEmpty(profile.social) ? profile.social : {};

      // Links
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        photo: profile.photo,
        location: profile.location,
        interests: interestsCSV,
        bio: profile.bio,
        youtube: profile.youtube,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeFile = e => {
    this.setState({ photo: e.target.files[0] })
  }

  onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('handle', this.state.handle);
    formData.append('photo', this.state.photo);
    formData.append('location', this.state.location);
    formData.append('interests', this.state.interests);
    formData.append('bio', this.state.bio);
    formData.append('youtube', this.state.youtube);
    formData.append('twitter', this.state.twitter);
    formData.append('facebook', this.state.facebook);
    formData.append('instagram', this.state.instagram);

    this.props.createProfile(formData, this.props.history);
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup 
            placeholder="Twitter URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup 
            placeholder="Facebook URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup 
            placeholder="Instagram URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile"
                />
                <input name="photo" type="file" onChange={this.onChangeFile} />
                <TextFieldGroup 
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state (e.g. San Jose, CA)"
                />
                <TextFieldGroup 
                  placeholder="Interests"
                  name="interests"
                  value={this.state.interests}
                  onChange={this.onChange}
                  error={errors.interests}
                  info="Please use comma separated values (e.g.
                    Strength Training, Yoga, Running, etc.)"
                />
                <TextAreaFieldGroup 
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us about yourself"
                />

                <div className="mb-3">
                  <button 
                    type="button"
                    onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }} className="btn btn-light">Edit Social Media Links</button>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
