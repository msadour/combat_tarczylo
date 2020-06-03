import React from 'react'

const TrainingItem = ({ trainings }) => {
  return (
    <div>
      <center><h1>Planning</h1></center>
      {trainings.map((training) => (
        <div key={training.id}>
            <h5 >{training.name}</h5>
        </div>
      ))}
    </div>
  )
};

export default TrainingItem