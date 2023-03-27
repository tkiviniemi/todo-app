const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todos = require('./routes/todos');
const users = require('./routes/users');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use('/api/todos', todos);

app.use('/api/users', users);

app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;
