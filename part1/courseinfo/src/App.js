const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }


  return (
      <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total tot={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>

      </div>
  )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0].name} ex={props.parts[0].exercises}/>
            <Part part={props.parts[1].name} ex={props.parts[1].exercises}/>
            <Part part={props.parts[2].name} ex={props.parts[2].exercises}/>
        </div>
    )
}

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Total = (props) => {
    return(
        <h2>
            The total n° of exercises is {props.tot}
        </h2>
    )
}

const Part = (props) => {
    return(
        <p>
            Part: {props.part}  has n° exerc: {props.ex}
        </p>
    )
}

export default App