import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const ExerciseVolumeList = ({ exerciseVolumeData }) => {

  let finalVolumeData = exerciseVolumeData
  let duplicateEntriesPerDayCheck = ''

 return (
  <div>
    {(finalVolumeData.length > 0) ?


    <LineChart width={600} height={300} data={finalVolumeData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis />
       <YAxis dataKey="exVolume"/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="exVolume" stroke="#8884d8" activeDot={{r: 8}}/>
       
    </LineChart>



    : <p></p>}
  </div> 
)}



export default ExerciseVolumeList
