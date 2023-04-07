const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express();
app.use(bodyParser.json());
require('./db')
dotenv.config();

// connected to MongoDB
mongoose.connect(
    process.env.MONGO_URL 
  );

// Get all todos for a user
app.get('/todos', authenticateToken, (req, res) => {
  const userTodos = todos.filter(todo => todo.userId === req.user.id);
  res.json(userTodos);
});

// Create a new todo
app.post('/todos', authenticateToken, (req, res) => {
  const todo = req.body;
  todo.id = todos.length + 1;
  todo.userId = req.user.id;
  todos.push(todo);
  res.json(todo);
});

// Update a todo
app.put('/todos/:id', authenticateToken, authorizeUser, (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  todo.title = req.body.title;
  todo.completed = req.body.completed;
  res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', authenticateToken, authorizeUser, (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(200);
});

// Authenticate user and return JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  });
});

// Authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No authorization'})
  }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
      });
    }
    
    // Authorize user for todo
    function authorizeUser(req, res, next) {
      const id = parseInt(req.params.id);
      const todo = todos.find(todo => todo.id === id);
    
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
    
      if (todo.userId !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }
    
      next();
    }
    
    app.listen(3000, () => console.log('Server started'));
  
