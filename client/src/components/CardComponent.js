import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteGoal } from '../actions/goalActions';
import { 
  Card, 
  CardImg, 
  CardTitle, 
  CardText, 
  CardBody, 
  Button 
} from 'reactstrap';

class CardComponent extends Component {

  onDeleteClick = (id) => {
    this.props.deleteGoal(id)
  }
  
  render() {
    const { title, id } = this.props;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardText>This is the goal's desc</CardText>
            <Button close
              className="remove-btn"
              size="small"
              onClick={this.onDeleteClick.bind(this, id)}
            >&times;</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  goal: state.goal
});

export default connect(mapStateToProps, { deleteGoal })(CardComponent);