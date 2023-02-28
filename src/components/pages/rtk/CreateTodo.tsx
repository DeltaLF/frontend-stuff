import React, { useState } from 'react';
import TodoFormComponent from './TodoFormComponent';
import { Button } from 'react-bootstrap';
import WrappedTooltips from '../../common/message/WrappedTooltips';

function CreateTodo() {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  function createTodoButton(callback: () => void) {
    return (
      <WrappedTooltips
        content="Create a todo card with redux-toolkit"
        placement="top"
      >
        <Button variant="success" className="todo-button" onClick={callback}>
          Create
        </Button>
      </WrappedTooltips>
    );
  }
  return (
    <TodoFormComponent
      isModalShown={isModalShown}
      setIsModalShown={setIsModalShown}
      type="Create"
      renderButton={createTodoButton}
    />
  );
}

export default CreateTodo;
