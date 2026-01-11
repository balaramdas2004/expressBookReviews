const express = require('express');
let books = require('./booksdb.js');

const general = express.Router();

// Get all books (async/await)
general.get('/', async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Get book by ISBN (async/await)
general.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({ message: "Book not found" });
});

// Get books by author (promise style)
general.get('/author/:author', (req, res) => {
  const author = req.params.author;
  let result = {};

  Object.keys(books).forEach(key => {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  });

  res.status(200).json(result);
});

// Get books by title (promise style)
general.get('/title/:title', (req, res) => {
  const title = req.params.title;
  let result = {};

  Object.keys(books).forEach(key => {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  });

  res.status(200).json(result);
});

// ✅ CORRECT EXPORT (THIS FIXES EVERYTHING)
module.exports.general = general;
