import React from 'react'
import ExerciseList from './ExerciseList'
import { getDays} from '../actions/dayActions';
import {  addExerciseToDay } from '../actions/dayActions';
import { Button } from 'reactstrap';
import  { Component } from 'react';
import { connect } from 'react-redux';
import "./styles/componentStyles.scss";


class TrainingDay extends Component {

  componentDidMount() {
    this.props.getDays();
  }

  /**
   * Returns the weights as an array
   * @param {string of weights going in} weightString 
   */
  makeWeightArray(weightString){
    ////////////////////////////////////////////////////need to have error validation code that makes sure the weight array. length is the same as sets
    let weightStringArray = weightString.split(" ")
    for (let i = 0; i < weightStringArray.length; i++){
      weightStringArray[i] = parseInt(weightStringArray[i])
    }
    return weightStringArray
  }

  errorValidateExercises(sets, reps) {
    if (isNaN(sets) || isNaN(reps)) {
      return true;
    }
    return false;

  }
  

  calculateVolume(sets, reps, weight){
    let volume = 0
    for (let i = 0; i < sets; i++){
      volume += reps * weight[i]
    }
    return volume
  }

render() {
let inputText, inputSets, inputReps, inputWeight, numbersInvalid
const { days } = this.props.day;
const  id  = this.props.match.params.id 
const dayName = this.props.match.params.text;
return(
  <div className="exercise-day">
      &nbsp;
        <h1 className="header">
          {dayName}
        </h1>
    

      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;

      <div>
      {(days.length > 0) ?/*find a way to sanitize this against 12/12/2012 format*/  <ExerciseList day={days.find(day => day._id === id)} id={id}></ExerciseList> : <p>list loading</p>}

      </div>
      &nbsp;
      &nbsp;


  <div className="exercise-form-container"> 
  &nbsp;
    <table className="exercise-form">
      <tbody>
        <tr>
          <td>
            <form  onSubmit={e => {
                e.preventDefault()
                if (!inputText.value.trim() || !inputSets.value.trim() || !inputReps.value.trim() || !inputWeight.value.trim()) {
                  return
                }

                //calculated once because used twice
                let weightArray = this.makeWeightArray(inputWeight.value)

                numbersInvalid = this.errorValidateExercises(inputSets.value, inputReps.value);

                this.props.addExerciseToDay({
                  exName: inputText.value,
                  sets: parseInt(inputSets.value),
                  reps: parseInt(inputReps.value),
                  weight: weightArray,
                  volume: this.calculateVolume(parseInt(inputSets.value), parseInt(inputReps.value), weightArray),
                  dayId: id
                  }
                )
                inputText.value = ''
                inputSets.value = null
                inputReps.value = null
                inputWeight.value = null
              }}>
              <div>
                <input placeholder="Exercise" ref={node => inputText = node} />
                <input placeholder="Sets" ref={node => inputSets = node} />
                <input placeholder="Reps" ref={node => inputReps = node} />
                <input placeholder="Weight" ref={node => inputWeight = node} />

              </div>

              &nbsp;
              &nbsp;
              &nbsp;

              <div className="centered-button">
                <Button
                  type="submit"
                  >
                  Add Exercise
              </Button>
              </div>
                

                {numbersInvalid ? <div>Please use numbers for set, reps, and weight</div> : <span></span>}
            </form>
          </td>
        </tr>

        <tr>
          <td>
          </td>

        </tr>
      </tbody>
    </table>
    </div>

    </div>
)}   
}
         
const mapStateToProps = state => ({
  day: state.day
});

export default connect(
  mapStateToProps,
  { getDays, addExerciseToDay }
)(TrainingDay);

