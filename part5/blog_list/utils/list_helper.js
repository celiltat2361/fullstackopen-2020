const totalLikes = (blogs) => {
  return blogs.reduce((total, b) => total += b.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  return blogs.reduce((max, b) => b.likes > max.likes ? b : max)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  let result = blogs
    .map((b) => b.author)
    .reduce((obj, author) => {
      if (!obj[author]) {
        obj[author] = 0
      }
      obj[author]++
      return obj
    }, {})
  let transformedResult = Object.keys(result).reduce((asList, authorName) => {
    asList.push({ author: authorName, blogs: result[authorName] })
    return asList
  }, [])
  return transformedResult.reduce((max, curr) => curr.blogs > max.blogs ? curr : max)
}


module.exports = {
 
  totalLikes,
  favoriteBlog,
  mostBlogs
};
