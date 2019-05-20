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
import { addDay } from '../actions/dayActions';
import "./styles/componentStyles.scss";

class DayModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newDay = {
      name: this.state.name
    };

    // Add item via addItem action
    this.props.addDay(newDay);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          className="addDayButton"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Day
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Training Day</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="day">Day</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Training Day"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Add Day
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  day: state.day
});

export default connect(
  mapStateToProps,
  { addDay }
)(DayModal);
