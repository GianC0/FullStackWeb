import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders blog in a correct way',  async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 10,
    url: 'https://www.minchhia.com/',
    user: {
      name: 'giallo',
      username: 'gian',
    },
  }



  const user = userEvent.setup()
  const component = render(<Blog blog={blog} user={user} />)

  // check that blog's title and author are displayed
  const titleAuthorDiv = component.getByTestId('titleAuthor')
  expect(titleAuthorDiv).toHaveTextContent('test title')
  expect(titleAuthorDiv).toHaveTextContent('test author')
  expect(titleAuthorDiv).not.toHaveStyle('display: none')

  // check that blog's url and number of likes are not displayed by default
  const urlLikesDiv = component.getByTestId('urlLikes')
  expect(urlLikesDiv).toHaveStyle('display: none')
})


test('url and likes displayed after button', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 10,
    url: 'https://www.minchhia.com/',
    user: {
      name: 'giallo',
      username: 'gian',
    },
  }

  const user = userEvent.setup()

  const component = render(<Blog blog={blog} user={user} />)

  const button = component.getByTestId('viewHideButton')
  await user.click(button)

  const urlLikesDiv = component.getByTestId('urlLikes')
  expect(urlLikesDiv).not.toHaveStyle('display: none')
})

test('like button called twice', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 10,
    url: 'https://www.minchhia.com/',
    user: {
      name: 'giallo',
      username: 'gian',
    },
  }

  const user = userEvent.setup()
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  )

  const viewHideButton = component.getByTestId('viewHideButton')
  await user.click(viewHideButton)

  const likeButton = component.getByTestId('likeButton')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('correct blog form submission', async () => {


  const createBlog = jest.fn()
  const user = userEvent.setup()

  const component = render(<BlogForm createBlog={createBlog} />)

  const titleInput = component.getByTestId('formTitle')
  const authorInput = component.getByTestId('formAuthor')
  const inputUrl = component.getByTestId('formUrl')

  const sendButton = component.getByTestId('formButton')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(inputUrl, 'test url')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  // TODO: The code below didn't work. Fix this part!
  //   expect(createBlog.mock.calls[0][0].content).toBe('testing title')
  expect(titleInput.value).toBe('test title')
  expect(authorInput.value).toBe('test author')
  expect(inputUrl.value).toBe('test url')
})