

describe('Blog app', function() {
  beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
      const user = {
          username: 'clltt',
          password: 'clltt'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      
  })

    it('front page can be opened', function() {
     
      cy.contains('Blogs')
      cy.contains('Blog List Application')
    })

    it('login form can be opened', function(){
       
        cy.contains('Login').click()
    })

    it('user can login', function () {
      cy.contains('Login').click()
      cy.get('#username').type('clltt')
      cy.get('#password').type('clltt')
      cy.get('#loginbutton').click()

      cy.contains('Celil Tat')
    })  

    describe('when logged in', function() {
      beforeEach(function() {
        cy.contains('Login').click()
        cy.get('#username').type('clltt')
        cy.get('#password').type('clltt')
        cy.get('#loginbutton').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('New Blog').click()
        cy.get('#title').type('Title test')
        cy.get('#author').type('author test')
        cy.get('#url').type('url test')
        cy.contains('Create').click()
        cy.contains("'Title test' by 'author test'")
        
      })

      it('a blog can be like', function(){
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Hide').click()
      })

      it('a blog can be deleted', function(){
        cy.contains('View').click()
        cy.contains('Delete').click()
        
      })

     
      it('blogs are ordered by like', function () {
        cy.root().find('.blog').first().find('.viewbutton').click()
        cy.root().find('.blog').first().find('.likebutton').click()
       
        cy.root().find('.blog').first().find('.blogLikes')
        cy.root().find('.blog').last().find('.viewbutton').click()
        cy.root().find('.blog').last().find('.likebutton').click()
       
        cy.root().find('.blog').last().find('.likebutton').click()
       
      })

    })

       
    
  })
