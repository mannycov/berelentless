import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addCheckIn } from '../../actions/goalActions';

class CheckInForm extends Component {
  state = {
    weight: '',
    reps: '',
    minutes: '',
    seconds: '',
    date: '',
    checkin: false,
    note: '',
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

  onSubmit = e => {
    e.preventDefault();
    const { goalId } = this.props;

    const newCheckIn = {
      weight: this.state.weight,
      reps: this.state.reps,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
      note: this.state.note,
      date: moment(this.state.date).format()
    };
    this.props.addCheckIn(goalId, newCheckIn);
    this.setState({ 
      weight: '',
      reps: '',
      minutes: '',
      seconds: '',
      note: '',
      date: ''
    });
  }
  
  render() {
    const { goal } = this.props.goal;
    const {
      weight,
      reps,
      minutes,
      seconds,
      note,
      date,
      errors
    } = this.state;

    let checkInFields;

    if (goal.category === 'Strength') {
      checkInFields = (
        <div>
          <TextFieldGroup
            placeholder="Weight"
            name="weight"
            value={weight}
            onChange={this.onChange}
            error={errors.weight}
          />
          <TextFieldGroup
            placeholder="Reps"
            name="reps"
            value={reps}
            onChange={this.onChange}
            error={errors.reps}
          />
        </div>
      ) 
    } else if (goal.category === 'Conditioning') {
      checkInFields = (
        <div>
          <TextFieldGroup 
            placeholder="Minutes"
            name="minutes"
            value={minutes}
            onChange={this.onChange}
            error={errors.minutes}
          />
          <TextFieldGroup 
            placeholder="Seconds"
            name="seconds"
            value={seconds}
            onChange={this.onChange}
            error={errors.seconds}
          />
        </div>
      )
    }

    return (
      <div className="checkin-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-primary text-white">
            Add a Check In
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                {checkInFields}
                <TextFieldGroup
                  placeholder="Date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={this.onChange}
                  error={errors.date}
                />
                <TextAreaFieldGroup
                  placeholder="Note"
                  name="note"
                  value={note}
                  onChange={this.onChange}
                  error={errors.note}
                  info="Add a note"
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

CheckInForm.propTypes = {
  addCheckIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  goal: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  goal: state.goal
});

export default connect(mapStateToProps, { addCheckIn })(CheckInForm);
