import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGoals, deleteGoal } from '../actions/goalActions';
import PropTypes from 'prop-types';

class GoalList extends Component {

  componentDidMount() {
    this.props.getGoals();
  }

  onDeleteClick = (id) => {
    this.props.deleteGoal(id);
  }

  render() {
    const { goals } = this.props.goal;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="goal-list">
            {goals.map(({ _id, title }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="small"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >&times;</Button>
                  {title}
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

export default connect(mapStateToProps, { getGoals, deleteGoal })(GoalList);
