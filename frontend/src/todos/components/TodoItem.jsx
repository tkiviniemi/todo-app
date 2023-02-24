import Card from '../../shared/components/Card/Card';
import Button from '../../shared/components/Button/Button';

import './TodoItem.css';

const TodoItem = (props) => {
  return (
    <li className="todo-item">
      <Card className="todo-item__content">
        <div className="todo-item__info">
          <h3>
            {props.task} - {props.tag} - {props.done ? 'Done' : 'Not Done'}
          </h3>
        </div>
        <div className="todo-item__actions">
          <Button>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
};

export default TodoItem;
