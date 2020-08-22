const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {

  test('of empty list', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('only one blog, equals the likes', () => {
    expect(listHelper.totalLikes([helper.testBlogs[0]])).toBe(helper.testBlogs[0].likes)
  })

  test('bigger blog in list', () => {
    expect(listHelper.totalLikes(helper.testBlogs)).toBe(36)
  })

})

describe('favorite blog', () => {
  
  test('empty is undefined', () => {
    expect(listHelper.favoriteBlog([])).toBe(undefined)
  })

  test('only one blog, equals to that', () => {
    expect(listHelper.favoriteBlog([helper.testBlogs[0]])).toEqual(helper.testBlogs[0])
  })

  test('bigger list is selected right', () => {
    expect(listHelper.favoriteBlog(helper.testBlogs)).toEqual(helper.testBlogs[2])
  })

})

describe('most blogs', () => {
  test('empty is undefined', () => {
    const emptyList = []
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(undefined)
  })

  test('only one blog, equals to that', () => {
    expect(listHelper.mostBlogs([helper.testBlogs[0]])).toEqual({ author: 'Michael Chan', blogs: 1 })
  })

  test('bigger list is selected right', () => {
    expect(listHelper.mostBlogs(helper.testBlogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})




