const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Get all books (ASYNC / AWAIT)
public_users.get('/', async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Get book by ISBN (ASYNC / AWAIT)
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    if (books[isbn]) {
      return res.status(200).json(books[isbn]);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book" });
  }
});

// Get books by Author (PROMISE)
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;
  let result = {};

  Object.keys(books).forEach(key => {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  });

  return res.status(200).json(result);
});

// Get books by Title (PROMISE)
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;
  let result = {};

  Object.keys(books).forEach(key => {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  });

  return res.status(200).json(result);
});

module.exports = public_users;
