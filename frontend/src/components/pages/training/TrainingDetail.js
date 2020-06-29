import React from 'react'

function get_list_time_table(time_table){
    const list_time_table = []

    if(time_table != null){
        time_table.forEach(time_table => {
            list_time_table.push(<p key={time_table.id}> {time_table.time_table_str} </p>)
        })
    }
    return list_time_table
}

const TrainingDetail = ({ trainings }) => {
  return (
    <div>
        <br />
        <table border="1" style={{width: '90%'}}>
        <tbody>
            <tr>
                <th colSpan={trainings.length}><center><h1>Next internship</h1></center></th>
            </tr>
            <tr>
                {trainings.map((training) => (
                    <th key={training.id} >
                        <h2>{training.name}</h2>
                        <img style={{width:"20%"}} src={training.picture} /><br />
                        {training.description} <br />
                        Date : {training.dates} <br />
                        Price : {training.price} <br />
                        Theme : {training.price} <br />
                        Instructor : {training.instructor.full_name} <br />
                        Open to :{training.category} <br />
                        Level : {training.level} <br /><br />

                        Availabilities : <br />

                        {get_list_time_table(training.time_table)}
                    </th>
                ))}
            </tr>
        </tbody>
      </table>
      <br />
    </div>
  )
};

export default TrainingDetail