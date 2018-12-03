import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class GoalList extends Component {
  state = {
    goals: [
      { id: uuid(), name: 'Lose 10lbs.' },
      { id: uuid(), name: 'Increase bench press 10lbs.' },
      { id: uuid(), name: 'Run 2 miles daily' },
      { id: uuid(), name: '25 pull-ups' }
    ]
  }

  render() {
    const { goals } = this.state;
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

export default GoalList;
