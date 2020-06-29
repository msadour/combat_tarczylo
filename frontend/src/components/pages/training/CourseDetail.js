import React from 'react';

function get_list_time_table(time_table){
    const list_time_table = []

    if(time_table != null){
        time_table.forEach(time_table => {
            list_time_table.push(<p key={time_table.id} className="text_jl"> {time_table.time_table_str} </p>)
        })
    }
    return list_time_table
}

const CourseDetail = ({ courses }) => {
  return (
    <div>
      <br />
      <table border="1" style={{width: '90%'}}>
        <tbody>
            <tr>
                <th colSpan={courses.length}><center><h1 className="text_jl">Course</h1></center></th>
            </tr>
            <tr>
                {courses.map((course) => (
                    <th key={course.id}>
                        <h2 className="text_jl">{course.name}</h2>
                        <p className="text_jl">{course.description}</p> <br />
                        <p className="text_jl">Open to :{course.category}</p> <br />
                        <p className="text_jl"> Level : {course.level}</p> <br />
                        <p className="text_jl">Instructor : {course.instructor.full_name}</p> <br /><br />

                        <p className="text_jl">Availabilities :</p> <br />
                        {get_list_time_table(course.time_table)}
                    </th>
                ))}
            </tr>
        </tbody>
      </table>
      <br />
    </div>
  )
};

export default CourseDetail