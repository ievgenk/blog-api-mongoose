const express = require('express');
const mongoose = require('mongoose');
const {
  Blog
} = require('./models/blogPost');
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/BlogPostsAPI');
const app = express();

app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  Blog.find({}).then((blogposts) => {
    let posts = blogposts.map((blogpost) => {
      return blogpost.fullName();
    })
    res.json(posts)
  }).catch((error) => {
    res.status(500).send(`Internal Server Error ${error}`)
  })
})

app.get('/posts/:id', (req, res) => {
  Blog.find({
    _id: req.params.id
  }).then((blogpost) => {
    res.json(blogpost[0].fullName())
  }).catch((error) => {
    res.status(500).send(`Internal Server Error ${error}`)
  })
})

app.post('/posts', (req, res) => {
  const required = ['title', 'content', 'author'];
  for (let i = 0; i < require.length; i++) {
    if (!(required[i] in req.body)) {
      return res.status(400).send(`Error missing ${required[i]} in your request.`)
    }
  }
  const newBlogPost = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: {
      firstName: req.body.author.firstName,
      lastName: req.body.author.lastName
    }
  })
  newBlogPost.save().then((blogpost) => {
    res.json(blogpost.fullName())
  }).catch((error) => {
    res.status(500).send(`Internal Server Error ${error}`)
  })
})

app.put('/posts/:id', (req, res) => {
  if (req.params.id === null || req.params.id !== req.body.id) {
    return res.status(400).send('Plese provide a correct id')
  }

  Blog.findOneAndUpdate({
    _id: req.body.id
  }, {
    $set: {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content
    }
  }).then((updatedBlog) => {
    res.status(200).json(updatedBlog.fullName())
  }).catch((error) => {
    return res.status(500).send(`Internal Server Error ${error}`)
  })
})

app.delete('/posts/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id).then(() => {
    res.status(204).send();
  }).catch((error) => {

    return res.status(500).send(`Internal Server Error ${error}`)
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})