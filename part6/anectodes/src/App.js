import { useEffect } from 'react'
import {AnecdoteForm} from "./components/AnecdoteForm";
import {AnecdoteList} from "./components/AnecdoteList";
import {Filter} from "./components/Filter"
import Notification from "./components/Notification";
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import store from "./store";


anecdoteService.getAll().then(anc =>
    store.dispatch(setAnecdotes(anc))
)

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    return (
    <div>
        <Notification></Notification>
      <h2>List</h2>
        <Filter></Filter>
        <AnecdoteList/>
      <h2>create new</h2>
        <AnecdoteForm/>
    </div>
  )
}

export default App