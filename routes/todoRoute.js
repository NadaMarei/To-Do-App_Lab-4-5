
const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');
const verified = require('../middlewares/verify');
const Todo = require('../models/todo');

// Get all todos for a user
  router.get('/todos', authenticateToken, (req, res) => {
    const userTodos = todos.filter(todo => todo.userId === req.user.id);
    res.json(userTodos);
  });
  
  // Create a new todo
  router.post('/todos', authenticateToken, (req, res) => {
    const todo = req.body;
    todo.id = todos.length + 1;
    todo.userId = req.user.id;
    todos.push(todo);
    res.json(todo);
  });
  
  // Update a todo
  router.put('/todos/:id', authenticateToken, authorizeUser, (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.json(todo);
  });
  
  // Delete a todo
  router.delete('/todos/:id', authenticateToken, authorizeUser, (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.sendStatus(200);
  });

  module.exports = router;

