import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGoals, deleteGoal } from '../actions/goalActions';
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
        {/* <TransitionGroup className="goal-list"> */}
          
            {goals.map(({ _id, title, description }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <Col sm="4">
                  <CardComponent 
                    title={title}
                    id={_id}
                    description={description}
                  />
                  <br/>
                </Col>
              </CSSTransition>
            ))}
          
        {/* </TransitionGroup> */}
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

export default connect(mapStateToProps, { getGoals, deleteGoal })(GoalList);
