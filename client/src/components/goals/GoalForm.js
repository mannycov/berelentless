import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addGoal } from '../../actions/goalActions';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class GoalForm extends Component {

  state = {
    title: '',
    category: '',
    weightTarget: '',
    repTarget: '',
    minutes: '',
    seconds: '',
    days: '',
    from: new Date(),
    to: new Date(),
    description: '',
    errors: {}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleChangeStart = date => {
    this.setState({ from: date });
  }

  handleChangeEnd = date => {
    this.setState({ to: date });
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newGoal = {
      title: this.state.title,
      category: this.state.category,
      weightTarget: this.state.weightTarget,
      repTarget: this.state.repTarget,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
      days: this.state.days,
      from: moment(this.state.from).format(),
      to: moment(this.state.to).format(),
      description: this.state.description,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addGoal(newGoal);

    this.setState({
      title: '',
      category: '',
      description: '',
      weightTarget: '',
      repTarget: '',
      minutes: '',
      seconds: '',
      days: '',
      from: new Date(),
      to: new Date()
    });
  }

  render() {
    const {
      errors,
      title,
      category,
      weightTarget,
      repTarget,
      minutes,
      seconds,
      days,
      from,
      to,
      description
    } = this.state;

    let categoryTargets;

    if (category === 'Strength') {
      categoryTargets = 
        <div>
          <TextFieldGroup 
            placeholder="Enter a weight target"
            name="weightTarget"
            value={weightTarget}
            onChange={this.onChange}
            error={errors.weightTarget}
          />
          <TextFieldGroup 
            placeholder="Enter a rep target"
            name="repTarget"
            value={repTarget}
            onChange={this.onChange}
            error={errors.repTarget}
          />
        </div>
    } else if (category === 'Conditioning') {
      categoryTargets =
        <div>
          <TextFieldGroup 
            placeholder="Enter a minutes target"
            name="minutes"
            value={minutes}
            onChange={this.onChange}
            error={errors.minutes}
          />
          <TextFieldGroup 
            placeholder="Enter a seconds target"
            name="seconds"
            value={seconds}
            onChange={this.onChange}
            error={errors.seconds}
          />
        </div>
    } else if (category === 'Habit') {
      categoryTargets = 
        <TextFieldGroup 
          placeholder="Enter the number of days"
          name="days"
          value={days}
          onChange={this.onChange}
          error={errors.days}
        />
    }

    const options = [
      { label: '* Select a Category', value: 0 },
      { label: 'Strength', value: 'Strength' },
      { label: 'Conditioning', value: 'Conditioning' },
      { label: 'Habit', value: 'Habit' }
    ];

    return (
      <div className="goal-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-primary text-white">
            Add a Goal
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
               <TextFieldGroup 
                  placeholder="Name your goal"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
               />
               <SelectListGroup
                  placeholder="Choose a category"
                  name="category"
                  value={category}
                  options={options}
                  onChange={this.onChange}
                  error={errors.category}
                />
                {categoryTargets}
                From{' '}
                <DatePicker
                 customInput={
                    <TextFieldGroup
                      name="from"
                    />}
                  selected={from}
                  selectsStart
                  startDate={from}
                  endDate={to}
                  onChange={this.handleChangeStart}
                />
                {' '}To{' '}
                <DatePicker
                  customInput={
                    <TextFieldGroup
                      name="to"
                    />}
                  selected={to}
                  selectsEnd
                  startDate={from}
                  endDate={to}
                  onChange={this.handleChangeEnd}
                  minDate={from}
                />
                <TextAreaFieldGroup
                  placeholder="Write a description..."
                  name="description"
                  value={description}
                  onChange={this.onChange}
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
