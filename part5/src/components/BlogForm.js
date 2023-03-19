const BlogForm = ({
  createBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  author,
  title,
  url,
}) => {
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
                    title:
          <input
            type="text"
            value={title}
            id="title"
            onChange={handleTitleChange}
            data-testid="formTitle"
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={author}
            id="author"
            onChange={handleAuthorChange}
            data-testid="formAuthor"
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            value={url}
            id="url"
            onChange={handleUrlChange}
            data-testid="formUrl"
          />
        </div>
        <button type="submit" data-testid="formButton" id='blogForm'>
                    create
        </button>
      </form>
    </div>
  )
}

export default BlogForm