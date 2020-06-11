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
      <center><h1>Next internship(s)</h1></center>
        <table border="1">
        <tbody>
            <tr>
                {trainings.map((training) => (
                    <th key={training.id}>
                        <h1>{training.name}</h1>
                        {training.description} <br />
                        Begin : {training.date_begin} <br />
                        End : {training.date_end} <br />
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
    </div>
  )
};

export default TrainingDetail