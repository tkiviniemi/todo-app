import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';

import Card from '../../shared/components/card/Card';
import Button from '../../shared/components/button/Button';
import Modal from '../../shared/components/modal/Modal';

import { AuthContext } from '../../shared/context/auth-context';
import { deleteTodo } from '../api/todos';

import './TodoItem.css';

const TodoItem = (props) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const auth = useContext(AuthContext);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteConfirmationHandler = () => {
    setShowConfirmationModal(false);
    deleteTodoMutation.mutate({
      id: props.id,
      token: auth.token,
    });
  };

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmationHandler}>
              Cancel
            </Button>
            <Button delete onClick={deleteConfirmationHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure? Once it's gone, it's gone!</p>
      </Modal>
      <li className="todo-item">
        <Card className="todo-item__content">
          <div className="todo-item__info">
            <h3>
              {props.task} - {props.tag} - {props.done ? 'Done' : 'Not Done'}
            </h3>
          </div>
          <div className="todo-item__actions">
            {auth.isLoggedIn && <Button>Edit</Button>}
            {auth.isLoggedIn && (
              <Button danger onClick={showConfirmationHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default TodoItem;
