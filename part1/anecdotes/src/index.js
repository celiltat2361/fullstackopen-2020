import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = (props) => {
    const [selected, setSelected] = useState(0)

    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

    const maxVote = votes.indexOf(Math.max(...votes))

    const handleNextAnecdote = () => {
        setSelected((Math.floor((Math.random() * anecdotes.length))))

    }

    const handleVotes = () => {
        const newVotes = [...votes]
        newVotes[selected] ++
        setVotes(newVotes)

    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div> {props.anecdotes[selected]} </div>
            <div>has {votes[selected]} votes</div>
            <button onClick={handleVotes}> vote</button>
            <button onClick={handleNextAnecdote}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <div>{props.anecdotes[maxVote]}</div>
            <div>has {votes[maxVote]} votes</div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)

