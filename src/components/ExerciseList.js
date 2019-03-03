import React from 'react'
import ExerciseEntry from './ExerciseEntry';
import { Table } from 'reactstrap';
import "./styles/componentStyles.scss";



const ExerciseList = ({ day, id }) => {




  let exercises = day.exercises
 return (
  <div className="exercise-table">
    <Table  dark bordered  >
      <tbody>
        <tr>
          <td className="red">Exercise</td>
          <td>Sets</td>
          <td>Reps</td>
          <td>Weight</td>
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