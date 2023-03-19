import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const [viewHideButton, setViewHideButton] = useState('view')
  const showDetails = { display: visible ? '' : 'none' }

  const toggle = () => {
    setVisible(!visible)
    setViewHideButton(viewHideButton === 'view' ? 'hide' : 'view')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikes = () => {
    updateBlog(blog._id, {
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog._id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div data-testid='titleAuthor'>
        {blog.title}, {blog.author}
        <button onClick={toggle} data-testid="viewHideButton" id='showBlog'>{viewHideButton}</button>
      </div>

      <div style={showDetails}  data-testid='urlLikes'>
        <p >{blog.url}</p>
        <p id='likes'>
            likes {blog.likes}
          <button onClick={handleLikes} data-testid="likeButton" id='likeButton'>like</button>
        </p>
        <p >{blog.user.name}</p>
        {user.username === blog.user.username ? (
          <button onClick={handleRemove} id='removeBlog' >remove</button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Blog