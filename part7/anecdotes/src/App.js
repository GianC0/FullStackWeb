import {useState} from 'react'
import {useField} from './hooks/useField'
import {Route, Routes, Link, useMatch, useNavigate} from 'react-router-dom'


const Anecdote = ({anecdote}) => {
    return (
        <div>
            <h2>
                {anecdote.content} by {anecdote.author}
            </h2>
            <p>has {anecdote.votes} votes</p>
            <p>
                for more info see <a href={anecdote.url}>{anecdote.url}</a>
            </p>
        </div>
    )
}

const AnecdoteList = ({anecdotes}) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map((anecdote) => (
                <li key={anecdote.id}>
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>
            ))}
        </ul>
    </div>
)

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>
            An anecdote is a brief, revealing account of an individual person or an
            incident. Occasionally humorous, anecdotes differ from jokes because their
            primary purpose is not simply to provoke laughter but to reveal a truth
            more general than the brief tale itself, such as to characterize a person
            by delineating a specific quirk or trait, to communicate an abstract idea
            about a person, place, or thing through the concrete details of a short
            narrative. An anecdote is &quot;a story with a point.&quot;
        </em>

        <p>
            Software engineering is full of excellent anecdotes, at this app you can
            find the best and add more.
        </p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
        See{' '}
        <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
            https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
        </a>{' '}
        for the source code.
    </div>
)

const CreateNew = (props) => {
    const cont = useField('text')
    const auth = useField('text')
    const url = useField('text')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: cont.value,
            author: auth.value,
            url: url.value,
            votes: 0,
        })
        navigate('/')
        const message = 'a new anecdote ' + cont.value + ' created!'
        props.setNotification(message)
        setTimeout(() => {
            props.setNotification(null)
        }, 3000)
    }

    const handleReset = (e) => {
        e.preventDefault()
        cont.reset()
        auth.reset()
        url.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content:
                    <input {...cont} reset={null}/>
                </div>
                <div>
                    author:
                    <input {...auth} reset={null}/>
                </div>
                <div>
                    url for more info:
                    <input {...url} reset={null}/>
                </div>
                <button>create</button>
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return <p>{message}</p>
}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            url: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1,
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            url: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2,
        },
    ])
    const [notification, setNotification] = useState('')
    const padding = {
        paddingRight: 5,
    }



    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
    }
    const anecdoteById = (id) => anecdotes.find((a) => a.id === id)
    const match = useMatch('/anecdotes/:id')
    const anecdote = match ? anecdoteById(parseInt(match.params.id)) : null

    return (
        <div>
            <h1>Software anecdotes</h1>
            <div>
                <Link style={padding} to="/anecdotes">
                    anecdotes
                </Link>
                <Link style={padding} to="/create">
                    create new
                </Link>
                <Link style={padding} to="/about">
                    about
                </Link>
            </div>
            <Notification message={notification}/>
            <Routes>
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/>
                <Route
                    path="anecdotes/:id"
                    element={<Anecdote anecdote={anecdote}/>}
                />
                <Route
                    path="/anecdotes"
                    element={<AnecdoteList anecdotes={anecdotes}/>}
                />
                <Route path="/about" element={<About/>}/>
                <Route
                    path="/create"
                    element={
                        <CreateNew addNew={addNew} setNotification={setNotification}/>
                    }
                />
            </Routes>
            <Footer/>
        </div>
    )
}

export default App