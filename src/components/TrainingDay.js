import React from 'react'
import ExerciseList from './ExerciseList'
import { getDays} from '../actions/dayActions';
import {  addExerciseToDay } from '../actions/dayActions';
import { Button } from 'reactstrap';
import  { Component } from 'react';
import { connect } from 'react-redux';


class TrainingDay extends Component {

  componentDidMount() {
    this.props.getDays();
  }

  makeWeightArray(weightString){
    ////////////////////////////////////////////////////need to have error validation code that makes sure the weight array. length is the same as sets
    let weightStringArray = weightString.split(" ")
    for (let i = 0; i < weightStringArray.length; i++){
      weightStringArray[i] = parseInt(weightStringArray[i])
    }
    return weightStringArray
  }

  calculateVolume(sets, reps, weight){
    let volume = 0
    for (let i = 0; i < sets; i++){
      volume += reps * weight[i]
    }
    return volume
  }

render() {
let inputText, inputSets, inputReps, inputWeight
const { days } = this.props.day;
const  id  = this.props.match.params.id 
return(
  <div>

      <table>
        <tbody>
          <tr>
            <td>
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
                    dayId: id
                    }
                  )
                  inputText.value = ''
                  inputSets.value = null
                  inputReps.value = null
                  inputWeight.value = null
                }}>

                  <input placeholder="Exercise" ref={node => inputText = node} />
                  <input placeholder="Sets" ref={node => inputSets = node} />
                  <input placeholder="Reps" ref={node => inputReps = node} />
                  <input placeholder="Weight" ref={node => inputWeight = node} />
                  <br/>
                  <Button
                      color="dark"
                      type="submit"
                      >
                      Add Exercise
                  </Button>
              </form>
            </td>
          </tr>

          <tr>
            <td>
            {(days.length > 0) ?/*find a way to sanitize this against 12/12/2012 format*/  <ExerciseList day={days.find(day => day._id === id)} id={id}></ExerciseList> : <p>list loading</p>}
            </td>

          </tr>
        </tbody>
      </table>
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

