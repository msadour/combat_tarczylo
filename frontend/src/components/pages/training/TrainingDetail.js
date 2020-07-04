import React from 'react'

function get_list_time_table(time_table){
    const list_time_table = []

    if(time_table != null){
        time_table.forEach(time_table => {
            list_time_table.push(<p key={time_table.id} className="text_presentation"> {time_table.time_table_str} </p>)
        })
    }
    return list_time_table
}

const TrainingDetail = ({ trainings }) => {
  return (
    <div style={{backgroundColor: "white"}}>
        <table border="0" className="page_content">
        <tbody>
            <tr>
                <th colSpan={trainings.length}><center>
                    <br />
                    <h2 className="text_jl">Next internships</h2></center>
                    <hr className="hr_presentation" style={{width: "12%"}}/>
                </th>
            </tr>

            {trainings.length == 0 ? (
                <tr>
                    <th>
                        <p className="text_presentation">No internship coming up.</p>
                        <br /><br /><br />
                    </th>
                </tr>
            ) : (
                <tr>
                    {trainings.map((training) => (
                        <th key={training.id} >
                            <div style={{backgroundColor: "#D8D8D8", width:"90%", marginLeft: "5%"}}>
                                <br />
                                <h3 className="text_jl">{training.name}</h3>
                                <img style={{width:"20%"}} src={training.picture} /> <br />
                                <p className="text_presentation">Date : {training.dates}</p>
                                <p className="text_presentation">Price : {training.price} €</p>
                                <p className="text_presentation">Theme : {training.theme}</p>
                                <p className="text_presentation">Instructor : {training.instructor.full_name}</p>
                                <p className="text_presentation">Open to :{training.category}</p>
                                <p className="text_presentation">Level : {training.level}</p>
                                <p className="text_presentation">Availabilities :</p>
                                {get_list_time_table(training.time_table)}
                                <br />
                            </div>
                        </th>
                    ))}
                </tr>
            )}

        </tbody>
      </table>
      <br /><br /><br /><br /><br /><br />
    </div>
  )
};

export default TrainingDetail