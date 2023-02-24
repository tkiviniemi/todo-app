import TodoItem from './TodoItem';

import './TodosList.css';

const TodosList = (props) => {
  return (
    <ul className="todos-list">
      {props.items.map((todo) => (
        <TodoItem
          key={todo.id}
          task={todo.task}
          tag={todo.tag}
          done={todo.done}
        />
      ))}
    </ul>
  );
};

export default TodosList;
