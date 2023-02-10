import { SerializedError } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { fetchRandomJoke } from '../../../redux/features/todos/todosSlice';
import { useAppDispatch } from '../../../redux/hooks';
import Alert from '../../common/message/Alert';

function JokeThunkGenerator() {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');
  // skip for prevent fetch data onmount

  async function generateTodoJoke() {
    try {
      await dispatch(fetchRandomJoke()).unwrap();
    } catch (err: SerializedError | unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof err.message === 'string'
      ) {
        setErrorMessage(err.message);
      } else {
        // general error
        setErrorMessage('Something went wrong');
      }
    }
  }
  return (
    <>
      <Alert setMessage={setErrorMessage} message={errorMessage} />
      <Button
        variant="warning"
        className="todo-button"
        style={{ marginLeft: '1rem' }}
        onClick={generateTodoJoke}
      >
        Fetch Joke with thunk
      </Button>
    </>
  );
}

export default JokeThunkGenerator;
