const express = require('express');
const axios = require('axios');
const public_users = express.Router();

// Base URL for books data
const BOOKS_API = "http://localhost:3000";

// Get all books (ASYNC / AWAIT + AXIOS)
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BOOKS_API}/books`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch books" });
  }
});

// Get book by ISBN (ASYNC / AWAIT + AXIOS)
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`${BOOKS_API}/books`);
    const book = response.data[req.params.isbn];

    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book by ISBN" });
  }
});

// Get books by Author (PROMISE CALLBACK + AXIOS)
public_users.get('/author/:author', (req, res) => {
  axios.get(`${BOOKS_API}/books`)
    .then(response => {
      const books = response.data;
      const result = {};

      Object.keys(books).forEach(key => {
        if (books[key].author === req.params.author) {
          result[key] = books[key];
        }
      });

      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving books by author" });
    });
});

// Get books by Title (PROMISE CALLBACK + AXIOS)
public_users.get('/title/:title', (req, res) => {
  axios.get(`${BOOKS_API}/books`)
    .then(response => {
      const books = response.data;
      const result = {};

      Object.keys(books).forEach(key => {
        if (books[key].title === req.params.title) {
          result[key] = books[key];
        }
      });

      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving books by title" });
    });
});

module.exports = public_users;

