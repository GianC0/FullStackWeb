import AnecdoteForm from './components/AnecdoteForm'
import { useMutation, useQueryClient } from 'react-query'
import { useQuery } from 'react-query'
import {getAnecdotes, updateAnecdote} from './components/requests'
import { useContext } from 'react'
import NotificationContext from "./components/NotificationContext";
import { NotificationContextProvider } from './components/NotificationContext'


const App = () => {

    const [notification, notificationDispatch] = useContext(NotificationContext, 0)
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation(updateAnecdote,{onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
    })

    const result = useQuery(
        'anecdotes',
        getAnecdotes,  {
            retry: false
        }
    )
    console.log(result)

    if ( result.isLoading ) {
        return <div>loading data...</div>
    }
    const anecdotes = result.data

    const handleVote = (anecdote) => {
        newAnecdoteMutation.mutate({...anecdote,votes:anecdote.votes+1})
        const payload = `Anecdote: ${anecdote.content} voted !!!`
        notificationDispatch({type:'SHOW',payload:payload})
    }

    const render = () => {
        if (anecdotes) {
            return (<div>
                    <h3>Anecdote app</h3>
                    <AnecdoteForm />
                    {anecdotes.map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => handleVote(anecdote)}>vote</button>
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        return <div><h3>problems with the server</h3></div>
    }

    return (

        <div>
            {render()}
        </div>
    )
}

export default App
