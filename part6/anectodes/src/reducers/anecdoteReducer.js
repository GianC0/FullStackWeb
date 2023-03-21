import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
//const initialState = anecdotesAtStart.map(asObject)

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    incrementVote (state,action){
      const id = action.payload.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      return newState.sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      console.log("payload: ",action.payload)
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdotesSlice.reducer
export const {incrementVote,appendAnecdote,setAnecdotes, } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.updateVote(anecdote.id, changedAnecdote)
    dispatch(incrementVote(changedAnecdote))
  }
}