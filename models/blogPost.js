const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  author: {
    firstName: String,
    lastName: String
  }
})

BlogSchema.methods.fullName = function () {
  return {
    title: this.title,
    content: this.content,
    author: `${this.author.firstName} ${this.author.lastName}`,
    created: new Date()
  }
}

const Blog = mongoose.model('blogpost', BlogSchema);


module.exports = {
  Blog
}