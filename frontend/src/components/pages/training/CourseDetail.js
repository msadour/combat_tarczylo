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
      <table className="page_content">
        <tbody>
            <tr>
                <th colSpan={courses.length}><center><h1 className="text_jl">Course</h1></center></th>
            </tr>
            <tr>
                {courses.map((course) => (
                    <th key={course.id}>
                        <h2 className="text_jl">{course.name}</h2>
                        <p className="text_jl">{course.description}</p>
                        <p className="text_jl">Open to :{course.category}</p>
                        <p className="text_jl"> Level : {course.level}</p>
                        <p className="text_jl">Instructor : {course.instructor.full_name}</p>

                        <p className="text_jl">Availabilities :</p>
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