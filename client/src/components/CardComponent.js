import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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

  onDeleteClick = id => {
    this.props.deleteGoal(id)
  }
  
  render() {
    const {
      id,
      title,
      category,
      description,
      weightTarget,
      repTarget,
      minutes,
      seconds,
      days
    } = this.props;
    let img;
    let target;

    if (category === 'Strength') {
      img = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/dumbbell.png';
      target =
      <div>
        <CardText>{weightTarget} lbs. - {repTarget} reps</CardText>
      </div>
    } else if (category === 'Conditioning') {
      img = 'https://cdn2.iconfinder.com/data/icons/sports-recreation/128/running-woman-512.png';
      target =
      <div>
        <CardText>{minutes}:{seconds}</CardText>
      </div>
    } else if (category === 'Habit') {
      img = 'https://png.icons8.com/metro/1600/checkmark.png';
      target = <CardText>{days} days</CardText>
    }
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={img} alt="Card image cap" />
          <CardBody>
            <CardTitle>
              <Link to={{
                pathname: `/goal/${id}`,
                state: { id }
              }}>
              {title}
              </Link>
            </CardTitle>
            <CardText>{description}</CardText>
            <CardText>{category}</CardText>
            {target}
            <br/>
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

export default withRouter(connect(mapStateToProps, { deleteGoal })(CardComponent));