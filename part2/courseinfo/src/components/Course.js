import React from 'react'

const Course = ({course}) => {
    /*
    const Part = ({part}) => {
        <p> {part.name} {part.exercises} </p>
    }
     */

    let total = 0;

    total = course.parts.reduce((previousValue,currentValue,currentIndex) => {
        currentValue= previousValue + course.parts[currentIndex].exercises.valueOf()
        return currentValue
    }, 0)



    return(
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part =>  <li key={part.id}> {part.name} {part.exercises} </li> )}
            </ul>
            <p>
                Total exercises: {total}
            </p>

        </div>
    )


}

export default Course