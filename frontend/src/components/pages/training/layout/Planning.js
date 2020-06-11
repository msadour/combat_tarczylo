import React from 'react'

const CourseItem = ({ courses }) => {
  return (
    <div>
      <center><h1>Planning</h1></center>
      {courses.map((course) => (
        <div key={course.id}>
            <h5 >{course.name}</h5>
        </div>
      ))}
    </div>
  )
};

export default CourseItem