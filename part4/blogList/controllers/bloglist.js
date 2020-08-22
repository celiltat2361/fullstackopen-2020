const bloglistRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

bloglistRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const body = request.body;

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

bloglistRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "this blog is not found" });
  }

  const user = await User.findById(decodedToken.id);
  if (blog.user.toString() === user.toJSON().id.toString()) {
    await Blog.findOneAndRemove(request.params.id);
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    );
    await user.save();
    response.status(204).end();
  } else {
    response.status(401).json({ error: "only allowed to delete own blogs" });
  }
});

bloglistRouter.put("/:id", async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };
  try {
    const total = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(total.toJSON());
  } catch (error) {
    response.status(400).end();
  }
});

module.exports = bloglistRouter;
