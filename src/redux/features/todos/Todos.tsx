import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createOneTodo, deleteOneTodo } from './todosSlice';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store';

const TodoComponent = () => {
  /*
  A component to quickly test todoSlice but not actually used. 
  */
  const [ids, setIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  function handleCreateNewTodo() {
    const id = uuidv4();
    setIds([...ids, id]);
    dispatch(
      createOneTodo({
        id,
        title: 'test',
        content: 'some hardcoded content',
        createAt: new Date().getTime(),
      })
    );
  }
  function handleDeleteTodo(): void {
    if (ids.length > 0) {
      dispatch(deleteOneTodo(ids[0]));
      setIds(ids.slice(1));
    }
  }
  return (
    <>
      <Button onClick={handleCreateNewTodo}>Create a new todo</Button>
      <Button variant="danger" onClick={handleDeleteTodo}>
        delete first to do
      </Button>
      <h4>show todos</h4>
      <>
        ids:{' '}
        {ids.map((id) => {
          return <h5 key={id}>{id}</h5>;
        })}
      </>
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
