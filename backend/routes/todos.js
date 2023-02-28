const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todos');

router.get('/', getTodos);

router.get('/:id', getTodoById);

//router.use(verifyToken);

router.post('/', createTodo);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router;
