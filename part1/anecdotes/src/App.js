import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const [selected, setSelected] = useState(0);
  const handleNextAn = () => {
    setSelected(selected+1)
  }

  const [votes,setVote] = useState([0,0,0,0,0,0,0]);
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[anec_idx]+=1
    setVote(newVotes)
  }




  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
  }
  const anec_idx = getRandomInt(0,7);

  const max_idx = votes.indexOf(Math.max(...votes));


  return (
      <div>
        <h1> Anecdote of the day </h1>
          <p> {anecdotes[anec_idx]} </p>
          <p>Votes: {votes[anec_idx]}</p>
          <button onClick={handleNextAn}> {"next anecdote"}</button>
          <button onClick={handleVote}> {"vote"}</button>

        <h1> Top Rated Anecdote </h1>
          <p>{anecdotes[max_idx]}</p>
          <p>Votes: {votes[max_idx]}</p>

      </div>
  )
}

export default App
