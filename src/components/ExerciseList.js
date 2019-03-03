import React from 'react'
import ExerciseEntry from './ExerciseEntry';
import { Table } from 'reactstrap';
import "./styles/componentStyles.scss";



const ExerciseList = ({ day, id }) => {




  let exercises = day.exercises
 return (
  <div >
    <Table  dark className="exercise-table"  >
      <tbody>
        <tr>
          <td className="top-td">Exercise</td>
          <td className="top-td">Sets</td>
          <td className="top-td">Reps</td>
          <td className="top-td">Weight</td>
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