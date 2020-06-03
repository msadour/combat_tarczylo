import React from 'react'

const TrainingDetail = ({ trainings }) => {
  return (
    <div>
      <center><h1>Planning</h1></center>
      {trainings.map((training) => (
        <div key={training.id}>
            <h5 >{training.name}</h5>
            {training.description}
        </div>
      ))}
    </div>
  )
};

export default TrainingDetail