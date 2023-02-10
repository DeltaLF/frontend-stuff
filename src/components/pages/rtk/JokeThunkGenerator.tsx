import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { fetchRandomJoke } from '../../../redux/features/todos/todosSlice';
import { useAppDispatch } from '../../../redux/hooks';

function JokeThunkGenerator() {
  const dispatch = useAppDispatch();
  // skip for prevent fetch data onmount

  function generateTodoJoke() {
    dispatch(fetchRandomJoke());
  }
  return (
    <Button
      variant="warning"
      className="todo-button"
      style={{ marginLeft: '1rem' }}
      onClick={generateTodoJoke}
    >
      Fetch Joke with thunk
    </Button>
  );
}

export default JokeThunkGenerator;
