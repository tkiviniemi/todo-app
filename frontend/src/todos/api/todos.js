export const getTodos = async () => {
  const res = await fetch('http://localhost:5000/api/todos');
  return await res.json();
};

export const createTodo = async ({ task, tag, done, token }) => {
  console.log(task, tag, done);
  const res = await fetch('http://localhost:5000/api/todos', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task,
      tag,
      done,
    }),
  });
  return await res.json();
};

export const updateTodo = async ({ id, task, tag, done, token }) => {
  const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      task,
      tag,
      done,
    }),
  });
  return await res.json();
};

export const deleteTodo = async ({ id, token }) => {
  const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
