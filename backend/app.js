const express = require('express');
const cors = require('cors');

const todos = require('./routes/todos');
const users = require('./routes/users');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://todo-app-mirxii.onrender.com/'],
  })
);

app.use('/api/todos', todos);

app.use('/api/users', users);

app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;
