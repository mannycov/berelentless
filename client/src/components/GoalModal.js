import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addGoal } from '../actions/goalActions';

class GoalModal extends Component {
  state = {
    modal: false,
    title: '',
    description: '',
    category: 'Strength',
    weightTarget: '',
    repTarget: '',
    minutes: '',
    seconds: '',
    days: '',
    img: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      category: ''
    });
  }

  onChange = e => {
    this.setState({ 
      [e.target.title]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const newGoal = {
      title: this.state.title,
      description: this.state.description,
      category: this.state.category
    }

    // Add goal via addGoal action
    this.props.addGoal(newGoal);

    // Close Modal
    this.toggle();
  }

  render() {
    const category = this.state.category;
    let target;

    if (category === 'Strength') {
      target = 
      <div>
        <Input
          type="text"
          title="weightTarget"
          id="goal"
          placeholder="Weight Target"
          onChange={this.onChange}
        />
        <Input
          type="text"
          title="repTarget"
          id="goal"
          placeholder="Rep Target"
          onChange={this.onChange}
        />
      </div>
    } else if (category === 'Conditioning') {
      target = 
      <div>
        <Input
          type="text"
          title="minutes"
          id="goal"
          placeholder="Minutes"
          onChange={this.onChange}
        />
        <Input
          type="text"
          title="seconds"
          id="goal"
          placeholder="Seconds"
          onChange={this.onChange}
        />
      </div>
    } else if (category === 'Habit') {
      target =
      <div>
        <Input
          type="text"
          title="days"
          id="goal"
          placeholder="Days"
          onChange={this.onChange}
        />
      </div>
    }

    return (
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >Add Goal</Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            Add a Goal to Your List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="goal">Goal</Label>
                {/* Title */}
                <Input
                  type="text"
                  title="title"
                  id="goal"
                  placeholder="Add Goal"
                  onChange={this.onChange}
                />
                {/* Description */}
                <Input
                  type="text"
                  title="description"
                  id="goal"
                  placeholder="Description"
                  onChange={this.onChange}
                />
                {/* Category */}
                <FormGroup>
                  <Label for="categories">Categories</Label>
                  <Input 
                    type="select"
                    title="category"
                    id="category"
                    placeholder="Categories"
                    onChange={this.onChange}
                  >
                    <option>Select a Category</option>
                    <option>Strength</option>
                    <option>Conditioning</option>
                    <option>Habit</option>
                  </Input>
                </FormGroup>
                {/* Goal Targets */}
                {target}
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >Add Goal</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  goal: state.goal
});

export default connect(mapStateToProps, { addGoal })(GoalModal);
