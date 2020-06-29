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
      <br />
      <table border="1" style={{width: '90%'}}>
        <tbody>
            <tr>
                <th colSpan={courses.length}><center><h1>Course</h1></center></th>
            </tr>
            <tr>
                {courses.map((course) => (
                    <th key={course.id}>
                        <h2>{course.name}</h2>
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
      <br />
    </div>
  )
};

export default CourseDetail