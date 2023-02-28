export const getTodos = async () => {
  const res = await fetch('http://localhost:5000/api/todos');
  return await res.json();
};

export const createTodo = async ({ task, tag, done }) => {
  console.log(task, tag, done);
  const res = await fetch('http://localhost:5000/api/todos', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task,
      tag,
      done,
    }),
  });
  return await res.json();
};

export const updateTodo = async ({ id, task, tag, done }) => {
  const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task,
      tag,
      done,
    }),
  });
  return await res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
