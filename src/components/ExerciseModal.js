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

class ExerciseModal extends Component {
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

    let inputText, inputSets, inputReps, inputWeight
    const { days } = this.props.day;
    //const  id  = this.props.match.params.id 


    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Day
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Training Day</ModalHeader>
          <ModalBody>



<form onSubmit={e => {
                    e.preventDefault()
                    
                    if (!inputText.value.trim() || !inputSets.value.trim() || !inputReps.value.trim() || !inputWeight.value.trim()) {
                      return
                    }

                    //calculated once because used twice
                    let weightArray = this.makeWeightArray(inputWeight.value)

                    this.props.addExerciseToDay({
                      exName: inputText.value,
                      sets: parseInt(inputSets.value),
                      reps: parseInt(inputReps.value),
                      weight: weightArray,
                      volume: this.calculateVolume(parseInt(inputSets.value), parseInt(inputReps.value), weightArray),
                      dayId: "fake id for now"
                      }
                    )
                    inputText.value = ''
                    inputSets.value = null
                    inputReps.value = null
                    inputWeight.value = null
                  }}>

                    <Input placeholder="Exercise" ref={node => inputText = node} />
                    <Input placeholder="Sets" ref={node => inputSets = node} />
                    <Input placeholder="Reps" ref={node => inputReps = node} />
                    <Input placeholder="Weight" ref={node => inputWeight = node} />
                    <br/>
                    <Button
                        color="dark"
                        type="submit"
                        >
                        Add Exercise
                        </Button>
                </form>



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
)(ExerciseModal);
