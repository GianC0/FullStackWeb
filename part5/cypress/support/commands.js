Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    console.log('hello')
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes = 0 }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title: title, author: author, url: url, likes: likes },
    headers: {
      Authorization: `bearer ${
          JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })
  cy.visit('http://localhost:3000')
})