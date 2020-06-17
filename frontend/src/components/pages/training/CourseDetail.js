import React from 'react';

function get_list_time_table(time_table){
    const list_time_table = []

    if(time_table != null){
        time_table.forEach(time_table => {
            list_time_table.push(<p key={time_table.id}> {time_table.time_table_str} </p>)
        })
    }
    return list_time_table
}

const CourseDetail = ({ courses }) => {
  return (
    <div>
      <center><h1>Course</h1></center>
      <table border="1">
        <tbody>
            <tr>
                {courses.map((course) => (
                    <th key={course.id}>
                        <h1>{course.name}</h1>
                        {course.description} <br />
                        Open to :{course.category} <br />
                        Level : {course.level} <br />
                        Instructor : {course.instructor.full_name} <br /><br />

                        Availabilities : <br />
                        {get_list_time_table(course.time_table)}
                    </th>
                ))}
            </tr>
        </tbody>
      </table>
    </div>
  )
};

export default CourseDetail