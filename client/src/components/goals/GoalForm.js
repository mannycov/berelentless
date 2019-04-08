import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addGoal } from '../../actions/goalActions';

class GoalForm extends Component {

  state = {
    title: '',
    errors: {}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newGoal = {
      title: this.state.title,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addGoal(newGoal);
    this.setState({ title: '' });
  }

  render() {
    const { errors, title } = this.state;
    return (
      <div className="goal-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Add Your Goal
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
               <TextAreaFieldGroup 
                placeholder="Create a goal"
                name="title"
                value={title}
                onChange={this.onChange}
                error={errors.title}
               />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

GoalForm.propTypes = {
  addGoal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addGoal })(GoalForm);
