import TodoItem from './TodoItem';

import './TodosList.css';

const TodosList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No todos found.</h2>
      </div>
    );
  }
  return (
    <ul className="todos-list">
      {props.items.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          task={todo.task}
          tag={todo.tag}
          done={todo.done}
        />
      ))}
    </ul>
  );
};

export default TodosList;
