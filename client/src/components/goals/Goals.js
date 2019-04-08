import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoalForm from './GoalForm';
import Spinner from '../common/Spinner';

class Goals extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <GoalForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Goals;
