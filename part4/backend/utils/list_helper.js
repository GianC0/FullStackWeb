const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {sum = sum + blog.likes})
  return sum
}

const favouriteBlog = (blogs) => {
  let max_likes = 0
  let f_blog
  blogs.forEach(blog => {
    if (blog.likes > max_likes) {
      max_likes = blog.likes
      f_blog = blog
    }
  })
  return f_blog
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null // handle empty input
  }

  // count number of blogs per author
  const blogCounts = {}
  for (const blog of blogs) {
    if (blog.author in blogCounts) {
      blogCounts[blog.author]++
    } else {
      blogCounts[blog.author] = 1
    }
  }

  // find author with most blogs
  let maxAuthor = null
  let maxCount = -1
  for (const [author, count] of Object.entries(blogCounts)) {
    if (count > maxCount) {
      maxAuthor = author
      maxCount = count
    }
  }

  // return result as an object with author and count properties
  return { author: maxAuthor, blogs: maxCount }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null; // handle empty input
  }

  // sum up likes per author
  const likesByAuthor = {};
  for (const blog of blogs) {
    if (blog.author in likesByAuthor) {
      likesByAuthor[blog.author] += blog.likes;
    } else {
      likesByAuthor[blog.author] = blog.likes;
    }
  }

  // find author with most likes
  let maxAuthor = null;
  let maxLikes = -1;
  for (const [author, likes] of Object.entries(likesByAuthor)) {
    if (likes > maxLikes) {
      maxAuthor = author;
      maxLikes = likes;
    }
  }

  // return result as an object with author and likes properties
  return { author: maxAuthor, likes: maxLikes };
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}