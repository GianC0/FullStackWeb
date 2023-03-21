import { useDispatch } from "react-redux"
import {createAnecdote} from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()




    const addAnc = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created a new anecdote '${content}'`, 5))
    }


    return(
        <form onSubmit={addAnc}>
            <div><input name='anecdote'/></div>
            <button type={"submit"}>create</button>
        </form>
    )
}

export {AnecdoteForm}