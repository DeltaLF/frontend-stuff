import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useGetRandomJokeQuery } from '../../../redux/apis/joke/jokeApi';
import { useAppDispatch } from '../../../redux/hooks';
import { createOneTodo } from '../../../redux/features/todos/todosSlice';
import { v4 as v4uuid } from 'uuid';
import Alert from '../../common/message/Alert';

function JokeQueryGenerator() {
  const dispatch = useAppDispatch();
  const [isSkipped, setIsSkipped] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  // skip for prevent fetch data onmount
  const properties = useGetRandomJokeQuery(undefined, { skip: isSkipped });
  const { data, error, isLoading, refetch } = properties;
  useEffect(() => {
    if (error) {
      if ('error' in error && typeof error.error === 'string') {
        setErrorMessage(error.error);
      } else {
        setErrorMessage('something went wrong');
      }
    }
  }, [error]);
  useEffect(() => {
    if (data?.joke) {
      dispatch(
        createOneTodo({
          id: v4uuid(),
          title: 'Read a joke',
          content: data.joke,
          createAt: new Date().getTime(),
        })
      );
    }
  }, [data]);

  function generateTodoJoke() {
    if (isSkipped) {
      setIsSkipped(false);
    } else {
      refetch();
    }
  }
  return (
    <>
      <Alert setMessage={setErrorMessage} message={errorMessage} />
      <Button
        className="todo-button"
        style={{ marginLeft: '1rem' }}
        variant="secondary"
        onClick={generateTodoJoke}
      >
        Fetch Joke with RTK Query
      </Button>
    </>
  );
}

export default JokeQueryGenerator;
