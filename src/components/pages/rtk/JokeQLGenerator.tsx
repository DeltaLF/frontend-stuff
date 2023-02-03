import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useGetRandomJokeQLQuery } from '../../../redux/graphql/joke/jokeApiQL';
import { useAppDispatch } from '../../../redux/hooks';
import { createOneTodo } from '../../../redux/features/todos/todosSlice';
import { v4 as v4uuid } from 'uuid';

function JokeQLGenerator() {
  const dispatch = useAppDispatch();
  const [isSkipped, setIsSkipped] = useState<boolean>(true);
  // skip for prevent fetch data onmount
  const properties = useGetRandomJokeQLQuery(undefined, { skip: isSkipped });

  const { data, error, isLoading, refetch } = properties;

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
    <Button style={{ marginLeft: '1rem' }} onClick={generateTodoJoke}>
      Fetch Joke graphql
    </Button>
  );
}

export default JokeQLGenerator;
