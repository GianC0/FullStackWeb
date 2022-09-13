import { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good+1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral+1)
    }
    const handleBadClick = () => {
        setBad(bad+1)
    }




    return (
        <div>
            <h1> Give Feedback </h1>
            <Button onClick={handleGoodClick} text={"good"} ></Button>
            <Button onClick={handleNeutralClick} text={"neutral"} ></Button>
            <Button onClick={handleBadClick} text={"bad"}  ></Button>
            <h1> Statistics </h1>
            <Stats good={good} neutral={neutral} bad={bad} ></Stats>


        </div>
    )

}

const Button = ({onClick,text}) => (
    <button onClick={onClick}  >{text}</button>
)

const Stats =({good,neutral,bad}) => {

    if (good!=0 || neutral!=0 || bad!=0){
        const tot = good+neutral+bad
        const avg = tot/3
        const pos = good/tot

        return(
            <div>
                <table>
                    <tbody>
                        <StatLine text={'good '} value={good} ></StatLine>
                        <StatLine text={'neutral  '} value={neutral} ></StatLine>
                        <StatLine text={'bad '} value={bad} ></StatLine>
                        <StatLine text={'tot '} value={tot} ></StatLine>
                        <StatLine text={'avg '} value={avg} ></StatLine>
                        <StatLine text={'positive'} value={(pos*100)+"%"} ></StatLine>
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div>
            <p> No feedback given</p>
        </div>
    )

}

const StatLine = ({text,value}) => {
    return(
        <tr>
            <td>{text}</td>
            <td>{value} </td>
        </tr>
    )
}

export default App