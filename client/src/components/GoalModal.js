import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import { connect } from 'react-redux';
import { addGoal } from '../actions/goalActions';

class GoalModal extends Component {
  state = {
    modal: false,
    title: '',
    description: '',
    category: '',
    dropDownOpen: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleDropDown = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    });
  }

  onChange = e => {
    this.setState({ 
      [e.target.title ]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const newGoal = {
      title: this.state.title,
      description: this.state.description
    }

    // Add goal via addGoal action
    this.props.addGoal(newGoal);

    // Close Modal
    this.toggle();
  }

  render() {
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
                <Input
                  type="text"
                  title="title"
                  id="goal"
                  placeholder="Add Goal"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  title="description"
                  id="goal"
                  placeholder="Description"
                  onChange={this.onChange}
                />
                <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggleDropDown}>
                  <DropdownToggle>
                    Categories
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Strength</DropdownItem>
                    <DropdownItem>Conditioning</DropdownItem>
                    <DropdownItem>Habit</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
