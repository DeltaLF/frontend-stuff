import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createOneTodo } from './todosSlice';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../app/store';

const TodoComponent = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  function handleCreateNewTodo() {
    dispatch(
      createOneTodo({
        id: uuidv4(),
        title: 'test',
        content: 'some hardcoded content',
        createAt: new Date().getTime(),
      })
    );
  }
  return (
    <>
      <Button onClick={handleCreateNewTodo}>Create a new todo</Button>
      <h4>show todos</h4>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h5>{todo.title}</h5>
          <p>{todo.content}</p>
          create at: {todo.createAt}
        </div>
      ))}
    </>
  );
};

export default TodoComponent;
