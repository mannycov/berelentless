import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const { comments, goalId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} goalId={goalId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  goalId: PropTypes.string.isRequired
};

export default CommentFeed;
