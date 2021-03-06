import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/goalActions';

class CommentForm extends Component {

  state = {
    text: '',
    errors: {}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { goalId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(goalId, newComment);
    this.setState({ text: '' });
  }

  render() {
    const { errors, text } = this.state;
    return (
      <div className="goal-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-primary text-white">
            Leave Your Comment
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
               <TextAreaFieldGroup 
                placeholder="Say something about the goal..."
                name="text"
                value={text}
                onChange={this.onChange}
                error={errors.text}
               />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  goalId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
