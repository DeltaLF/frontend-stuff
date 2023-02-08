import React, { useState } from 'react';
import TodoFormComponent from './TodoFormComponent';
import {
  TodoState,
  updateOneTodo,
} from '../../../redux/features/todos/todosSlice';
import { PencilSquare } from 'react-bootstrap-icons';

interface UpdateTodo {
  todoState: TodoState;
}

function UpdateTodo({ todoState }: UpdateTodo) {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  function renderTodoButton(callback: () => void) {
    return <PencilSquare onClick={callback} />;
  }
  return (
    <TodoFormComponent
      isModalShown={isModalShown}
      setIsModalShown={setIsModalShown}
      type={'Edit'}
      initalValue={todoState}
      renderButton={renderTodoButton}
    />
  );
}

export default UpdateTodo;
