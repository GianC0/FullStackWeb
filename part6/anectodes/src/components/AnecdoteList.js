import { useSelector, useDispatch } from 'react-redux'
import {vote} from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const {anecdotes,filter} = useSelector(state => state)

    const voteAn = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
    }

    const updateList = () => {
        let filteredAnectodes = anecdotes.filter(an => an.content.includes(filter))
        return filteredAnectodes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {voteAn(anecdote)} }>vote</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {updateList()}
        </div>
    )
}

export {AnecdoteList}