import React from 'react'
import  { Component } from 'react';
import ExerciseVolumeList from './ExerciseVolumeList'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


export default class VolumeTracking extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      exercisesToGraph: [],
      dropdownOpen: false
    };
  }


  makeExerciseArrayForGraph(name, largeExerciseArray){
    let returnedExArray = []
    for (let i = 0; i < largeExerciseArray.length; i++){
      if (largeExerciseArray[i].exerciseName === name){
          returnedExArray.push(largeExerciseArray[i])
      }
    }
    return returnedExArray
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


render() {
const ArrayofAllExercises = this.props.exerciseList;
let nonDuplicateExerciseArray = [...new Set(ArrayofAllExercises.map(item => item.exerciseName))];

//console.log(ArrayofAllExercises);
//console.log(nonDuplicateExerciseArray)
return(
    <div>



      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Button Dropdown
        </DropdownToggle>
        <DropdownMenu>
          {nonDuplicateExerciseArray.map((entry,i) => 
        <DropdownItem 
        
        onClick={() => {this.setState({exercisesToGraph : this.makeExerciseArrayForGraph(entry, ArrayofAllExercises)})}}
        key={i}>{entry}</DropdownItem>)}
          
        </DropdownMenu>
      </ButtonDropdown>
      
        <ExerciseVolumeList exerciseVolumeData={this.state.exercisesToGraph}></ExerciseVolumeList>


    </div>
)}   
}



