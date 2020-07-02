import React from 'react';

function get_list_time_table(time_table){
    const list_time_table = []

    if(time_table != null){
        time_table.forEach(time_table => {
            list_time_table.push(<p key={time_table.id} className="text_presentation"> {time_table.time_table_str} </p>)
        })
    }
    return list_time_table
}

const CourseDetail = ({ courses }) => {
  return (
    <div>
      <table border="0" className="page_content" style={{backgroundColor: "white"}}>
        <tbody>
            <tr>
                <th colSpan={courses.length}><center>
                    <br />
                    <h2 className="text_jl">Courses</h2></center>
                    <hr className="hr_presentation" style={{width: "5%"}}/>
                </th>
            </tr>
            <tr>
                {courses.map((course) => (
                    <th key={course.id} >
                        <div style={{backgroundColor: "#D8D8D8", width:"90%", marginLeft: "5%"}}>
                            <br />
                            <h3 className="text_jl">{course.name}</h3>
                            <p className="text_presentation">Open to :{course.category}</p>
                            <p className="text_presentation"> Level : {course.level}</p>
                            <p className="text_presentation">Instructor : {course.instructor.full_name}</p>
                            <p className="text_presentation">Availabilities :</p>
                            {get_list_time_table(course.time_table)}
                            <br />
                        </div>
                    </th>
                ))}
            </tr>
        </tbody>
      </table>

    </div>
  )
};

export default CourseDetail