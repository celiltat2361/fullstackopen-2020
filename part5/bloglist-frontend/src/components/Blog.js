import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWith: 1,
  marginBottom: 5
}

const Blog = ({ blog, user, handleDelete, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const hideVisible = { display: visible ? 'none' : '' }
  const showVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='blogHeader'>
        &apos;{blog.title}&apos; by &apos;{blog.author}&apos;
        <button className="viewbutton" style={hideVisible} onClick={toggleVisibility}>View</button>
        <button className="hidebutton" style={showVisible} onClick={toggleVisibility}>Hide</button>
      </div>
      <div className='blogAddress' style={showVisible}>Link: {blog.url}</div>
      <div className='blogLikes' style={showVisible}>Likes: {blog.likes} <button className="likebutton" onClick={() => handleLike(blog.id)}>Like</button></div>
      <div className='blogOwner' style={showVisible}>Added By: {blog.user.name}</div>
      {user !== null && user.name === blog.user.name &&
        <div style={showVisible}><button className="deletebutton" onClick={() => handleDelete(blog.id)}>Delete</button></div>
      }
    </div>
  )
}

export default Blog