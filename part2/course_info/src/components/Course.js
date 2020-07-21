import React from 'react';


const Course = ({course}) => (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
)

const Header = (props) => {
  return(
    <h1>
      {props.course.name}
    </h1>
  )
}



const Part = (props) => {
  return(
    <p>{props.part}: {props.exercises}</p>
  )  
}


const Content = ({ course }) => {
  const sumExercises = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
      <div>
          {course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
          <p>
              <strong>Total of {sumExercises} exercises</strong>
          </p>
      </div>
  )
}

export default Course;

