import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {  editExercise, removeExercise } from '../actions/dayActions';
import { connect } from 'react-redux';

class ExerciseEntry extends Component {

    
    state = {
        editable: false
    }

    updateExercise = (exerciseId, dayId, setParam, repParam, weightParam, nameParam) => {
        
        this.props.editExercise({
            exId: exerciseId,
            dayId: dayId,
            sets: setParam,
            reps: repParam,
            weight: weightParam,
            exName: nameParam,
            volume: this.calculateVolume(setParam, repParam, weightParam)
            }
          )       
    }

    deleteExercise = (exerciseId, dayId) => {
        this.props.removeExercise({
            exId: exerciseId,
            dayId: dayId,
        })
    }
    
    calculateVolume = (sets, reps, weight) => {
        let volume = 0
        for (let i = 0; i < sets; i++){
          volume += reps * weight[i]
        }
        return volume
    }


    render(){
        let editText, editSets, editReps, editWeight
        const _id = this.props._id
        const dayId = this.props.dayId
        const sets = editSets = this.props.sets
        const reps = editReps =  this.props.reps
        const weight = editWeight = this.props.weight
        const exName = editText = this.props.exName
        const exId = this.props.exId;

        if (this.state.editable){ // css need to make the inputs the same size as the table data containers
            return (
                <tr>
                <td><input defaultValue={exName} ref={node => editText = node}/> </td>
                <td><input defaultValue={sets} ref={node => editSets = node}/></td>
                <td><input defaultValue={reps} ref={node => editReps = node}/></td>
                <td><input defaultValue={weight.join(",")} ref={node => editWeight = node}/></td>
                <td><Button  onClick={() => { this.updateExercise(_id, dayId, editSets.value, editReps.value, editWeight.value, editText.value); this.setState({editable: false});}}>
                            Save
                        </Button></td>
                        <td><Button  onClick={() => { 
                            this.deleteExercise(exId, dayId); this.setState({editable: false});}}>
                            Delete
                        </Button></td>
            </tr>
            )
        } else {
            return (
                <tr>
                <td>{exName}</td>
                <td>{sets}</td>
                <td>{reps}</td>
                <td>{weight.join(",")}</td>
                <td><Button  onClick={() => {this.setState({editable: true})}}>
                            Update
                        </Button></td>
                        <td><Button  onClick={() => { this.deleteExercise(exId, dayId); this.setState({editable: false});}}>
                            Delete
                        </Button></td>
            </tr>
            )
        }
    } 
}



const mapStateToProps = state => ({
    day: state.day
  });

export default connect(
     mapStateToProps,
     { editExercise, removeExercise }
  )(ExerciseEntry);

