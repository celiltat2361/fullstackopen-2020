import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => (
        <tr>
            <th>{text}</th>
            <th>{value}</th>
        </tr>
    )

const Statistics = ({good, neutral, bad}) => {
    const Sum = good + neutral + bad
    const Average = (good - bad) / Sum
    const Positive = good/Sum*100

    if(Sum === 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <p>No feedback given!</p>
            </div>
        )
    } else {

        return (
            <div>
                <h2>Statistics</h2>

                <Statistic text="good" value={good}/>
                <Statistic text="bad" value={bad}/>
                <Statistic text="neutral" value={neutral}/>
                <Statistic text="all" value={Sum}/>
                <Statistic text={"average"} value={Average}/>
                <Statistic text={"positive"} value={Positive + " %"}/>

            </div>
        )

    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button onClick={handleGoodClick} text="good"/>
            <Button onClick={handleBadClick} text="bad"/>
            <Button onClick={handleNeutralClick} text="neutral"/>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)


