import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CheckIn extends Component {
  render() {
    return (
      <div>
        <h1>HELLOOOOOO</h1>
        <div>The Check In Component</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  goal: state.goal
});

export default withRouter(connect(mapStateToProps)(CheckIn));