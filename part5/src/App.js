import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  // blog states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )


  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')



    } catch (exception) {
      setMessage('Wrong credentials')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }

  }
  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.resetToken()
      setUser('')
      setUsername('')
      setPassword('')
      setMessage('Log-out successful, please reload page.')
    }catch (exception) {
      setMessage('General Error, reload session')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }
  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {


      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${title} by ${author} added`)
      setIsError(false)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('blog could not be added')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const compareBlogLikes = (b1, b2) => {
    return b2.likes - b1.likes
  }

  const updateBlog = async (blogId, blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.update(blogId, blogObject)
      setBlogs(
        blogs.map((currBlog) =>
          currBlog.id === blogId ? blogObject : currBlog
        )
      )
      setMessage(
        `increased the like of blog ${blogObject.title} by ${blogObject.author}`
      )
      setIsError(false)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('the like could not be increased')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter((currBlog) => currBlog._id !== blogId))
      setMessage('deleted successfully')
      setIsError(false)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('blog could not be deleted')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }


  return (
    <div>
      <h1>Blogs</h1>

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      )

        : (<div>
          <p>{user.name} logged in</p>
          {blogs.sort(compareBlogLikes) &&
                            blogs.map((blog) => (
                              <li key={blog._id}>
                                <Blog
                                  key={blog._id}
                                  user={user}
                                  blog={blog}
                                  updateBlog={updateBlog}
                                  removeBlog={removeBlog}
                                />
                              </li>
                            ))}
          <button type="submit" onClick={handleLogout} id={'logoutBT'}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef} > <BlogForm
            createBlog = {handleAddBlog}
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            addBlog={handleAddBlog}
          /></Togglable>




        </div>
        )}


      <Notification message={message} isError={isError} />
    </div>

  )

}

export default App