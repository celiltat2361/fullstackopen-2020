const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const config = require('../utils/config')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')





beforeAll(async () => {
    await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  })
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash(helper.testUser.password, 10)
    let user = new User({
      username: helper.testUser.username,
      name: helper.testUser.name,
      passwordHash: passwordHash
    })
  
    user = await user.save()
  
    for (let blog of helper.testBlogs) {
      let newBlog = new Blog(blog)
      newBlog.user = user.toJSON().id.toString()
      newBlog = await newBlog.save()
      user.blogs.push(newBlog.toJSON().id.toString())
    }
    user = await user.save()
    tuId = user.toJSON().id
  }, 10000)
describe('when there are some blogs initially saved', () =>{
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    
  

  test('Blogs titles testing are as expected', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(x => x.title)
    const expectedTitles = helper.testBlogs.map(x => x.title)
    expectedTitles.forEach((title) => {
      expect(titles).toContainEqual(title)
    })
    
   
  })

  test('is ID defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
    expect(response.body[0].__v).not.toBeDefined()
  })
 
})

  
  afterAll(() => {
    mongoose.connection.close()
  })