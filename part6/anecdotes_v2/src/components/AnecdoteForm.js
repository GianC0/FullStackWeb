import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from "./NotificationContext";



const AnecdoteForm = () => {
    const getId = () => (100000 * Math.random()).toFixed(0)

    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation(createAnecdote,{onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
    },})

    const [notification, notificationDispatch] = useContext(NotificationContext, 0)

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
        newAnecdoteMutation.mutate({content:content,id:getId(),votes:0})
        const payload = `Anecdote: ${content} created !!!`
        notificationDispatch({type:'SHOW',payload:payload})
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
