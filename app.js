const express = require('express');
const mongoose = require('mongoose');
const {
  Blog
} = require('./models/blogPost');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/BlogPostsAPI');
const app = express();

app.get('/posts', (req, res) => {
  Blog.find({}).then((blogposts) => {
    let posts = blogposts.map((blogpost) => {
      return blogpost.fullName();
    })
    res.json(posts)
  }).catch((error) => {
    console.log(error)
  })

})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})