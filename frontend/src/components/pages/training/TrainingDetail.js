import React from 'react'

function get_list_time_table(time_table){
    const list_time_table = []

    if(time_table != null){
        time_table.forEach(time_table => {
            list_time_table.push(<p key={time_table.id} className="text_jl"> {time_table.time_table_str} </p>)
        })
    }
    return list_time_table
}

const TrainingDetail = ({ trainings }) => {
  return (
    <div>
        <br />
        <table border="1" style={{width: '90%'}} className="page_content">
        <tbody>
            <tr>
                <th colSpan={trainings.length}><center><h1 className="text_jl">Next internship</h1></center></th>
            </tr>
            <tr>
                {trainings.map((training) => (
                    <th key={training.id} >
                        <h2 className="text_jl">{training.name}</h2>
                        <img style={{width:"20%"}} src={training.picture} /><br />
                        <p className="text_jl">{training.description}</p> <br />
                        <p className="text_jl">Date : {training.dates}</p> <br />
                        <p className="text_jl">Price : {training.price} €</p> <br />
                        <p className="text_jl">Theme : {training.theme}</p> <br />
                        <p className="text_jl">Instructor : {training.instructor.full_name}</p> <br />
                        <p className="text_jl">Open to :{training.category}</p> <br />
                        <p className="text_jl">Level : {training.level}</p> <br /><br />

                        <p className="text_jl">Availabilities :</p> <br />

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