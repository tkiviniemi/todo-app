import { useRef } from 'react';
import { useMutation } from 'react-query';

import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/button/Button';
import { createTodo } from '../api/todos';

import { AuthContext } from '../../shared/context/auth-context';

import './AddTodo.css';

const AddTodo = () => {
  const taskRef = useRef();
  const tagRef = useRef();
  const doneRef = useRef();

  const auth = useContext(AuthContext);

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
  });

  const todoSubmitHandler = async (event) => {
    event.preventDefault();
    createTodoMutation.mutate({
      task: taskRef.current.value,
      tag: tagRef.current.value,
      done: doneRef.current.checked,
      token: auth.token,
    });
  };

  return (
    <form className="todo-form" onSubmit={todoSubmitHandler}>
      <Input id="task" ref={taskRef} type="text" label="Task" />
      <Input id="tag" ref={tagRef} type="text" label="Tag" />
      <Input id="done" ref={doneRef} type="checkbox" label="Done" />
      <Button type="submit">Add Todo</Button>
    </form>
  );
};

export default AddTodo;
