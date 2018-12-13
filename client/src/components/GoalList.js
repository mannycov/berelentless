import React, { Component } from 'react';
import { Container, CardDeck, Card, CardImg, CardTitle, CardText, CardBody, ListGroup, ListGroupItem, Button } from 'reactstrap';
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
      // <Container>
      //   <ListGroup>
      //     <TransitionGroup className="goal-list">
      //       {goals.map(({ _id, title }) => (
      //         <CSSTransition key={_id} timeout={500} classNames="fade">
      //           <ListGroupItem>
      //             <Button
      //               className="remove-btn"
      //               color="danger"
      //               size="small"
      //               onClick={this.onDeleteClick.bind(this, _id)}
      //             >&times;</Button>
      //             {title}
      //           </ListGroupItem>
      //         </CSSTransition>
      //       ))}
      //     </TransitionGroup>
      //   </ListGroup>
      // </Container>
      <Container>
        <CardDeck>
          <TransitionGroup className="goal-list">
            {goals.map(({ _id, title }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <Card>
                  <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <CardText>This is the goal's description</CardText>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="small"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >&times;</Button>
                  </CardBody>
                </Card>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </CardDeck>
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
