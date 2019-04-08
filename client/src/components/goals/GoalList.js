import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getGoals, deleteGoal } from '../../actions/goalActions';
import 
import PropTypes from 'prop-types';

import CardComponent from './CardComponent';

class GoalList extends Component {

  componentDidMount() {
    this.props.getGoals();
  }

  render() {
    const { goals } = this.props.goal;
    return (
      <Container>
        <Row>
          {goals.map(({ _id, title, description, category, weightTarget, repTarget, minutes, seconds, days }) => (
            <Col sm="4" >    
              <CardComponent 
                id={_id} 
                title={title}
                description={description}
                category={category}
                weightTarget={weightTarget}
                repTarget={repTarget}
                minutes={minutes}
                seconds={seconds}
                days={days}
              />
              <br/>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

GoalList.propTypes = {
  getGoals: PropTypes.func.isRequired,
  goal: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  goal: state.goal
});

export default withRouter(connect(mapStateToProps, { getGoals, deleteGoal })(GoalList));
