import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getGoals } from '../actions/goalActions';
import PropTypes from 'prop-types';

class GoalList extends Component {

  componentDidMount() {
    this.props.getGoals();
  }

  render() {
    const { goals } = this.props.goal;
    return (
      <Container>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const name = prompt('Enter Goal');
            if (name) {
              this.setState(state => ({
                goals: [...state.goals, { id: uuid(), name }]
              }));
            }
          }}
        >Add Goal</Button>

        <ListGroup>
          <TransitionGroup className="goal-list">
            {goals.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="small"
                    onClick={() => {
                      this.setState(state => ({
                        goals: state.goals.filter(goal => goal.id !==id)
                      }));
                    }}
                  >&times;</Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
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

export default connect(mapStateToProps, { getGoals })(GoalList);
