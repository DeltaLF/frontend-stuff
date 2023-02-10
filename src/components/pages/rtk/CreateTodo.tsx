import React, { useState } from 'react';
import TodoFormComponent from './TodoFormComponent';
import { Button } from 'react-bootstrap';

function CreateTodo() {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  function createTodoButton(callback: () => void) {
    return (
      <Button variant="success" className="todo-button" onClick={callback}>
        Create
      </Button>
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
