import React from 'react'
import ExerciseEntry from './ExerciseEntry';
import { Table } from 'reactstrap';


const ExerciseList = ({ day, id }) => {




  let exercises = day.exercises
 return (
  <div>
    <Table  dark bordered>
      <tbody>
        <tr>
          <td contenteditable="true" >Exercise</td>
          <td contenteditable="true">Sets</td>
          <td contenteditable="true">Reps</td>
          <td contenteditable="true">Weight</td>
        </tr>
        {exercises.map(exercise => 
        <ExerciseEntry
          key={exercise._id}
          {...exercise}
        /> 
      )}
      </tbody>
    </Table>
  </div>
)}


export default ExerciseList