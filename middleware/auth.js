const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');
const bcrypt = require('bcrypt');
const app = express();



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
