import React from 'react'

const CourseDetail = ({ courses }) => {
  return (
    <div>
      <center><h1>Planning</h1></center>
      {courses.map((course) => (
        <div key={course.id}>
            <h5 >{course.name}</h5>
            {course.description}
        </div>
      ))}
    </div>
  )
};

export default CourseDetail