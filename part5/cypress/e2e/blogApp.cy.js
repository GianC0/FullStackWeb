describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/reset/')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('superTest')
      cy.get('#password').type('superTest')
      cy.get('#login-button').click()
      cy.contains('logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrongpwd')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    const newBlog = {
      title: 'Michel',
      author: 'waglio',
      url: 'ehi',
      likes: 2,
    }

    beforeEach(function() {
      cy.login({ username:'superTest',password:'superTest' })
    })

    it('A blog can be created', function() {
      cy.createBlog(newBlog)
      cy.contains('Michel')
    })

    it('A blog can be liked', function() {
      cy.createBlog(newBlog)
      cy.get('#showBlog').click()
      cy.get('#likeButton').click()
      cy.contains('increased the like of')
    })

    it('A blog can be deleted', function() {
      cy.createBlog(newBlog)
      cy.get('#showBlog').click()
      cy.visit('http://localhost:3000')
      cy.get('#showBlog').click()
      cy.get('#removeBlog').click()
      cy.contains('deleted successfully')
    })

    it('Blogs are ordered according to their likes (most likes being first)', function () {
      cy.login({ username:'superTest',password:'superTest' })


      cy.createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      })
      cy.createBlog({
        title: 'A Search Engine',
        author: 'Google',
        url: 'google.com',
        likes: 4,
      })
      cy.createBlog({
        title: 'A Good Laptop',
        author: 'Dell',
        url: 'test.com',
        likes: 5,
      })
      cy.get('.blog').eq(0).should('contain', 'A Good Laptop')
      cy.get('.blog').eq(1).should('contain', 'A Search Engine')
      cy.get('.blog').eq(2).should('contain', newBlog.title)
    })

  })




})
