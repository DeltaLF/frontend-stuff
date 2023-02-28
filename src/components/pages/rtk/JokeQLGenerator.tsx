import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useGetRandomJokeQLQuery } from '../../../redux/graphql/joke/jokeApiQL';
import { useAppDispatch } from '../../../redux/hooks';
import { createOneTodo } from '../../../redux/features/todos/todosSlice';
import { v4 as v4uuid } from 'uuid';
import Form from 'react-bootstrap/Form';
import './jokeQLGenerator.scss';
import { JokeQLOptions, JokeQLKey } from '../../../redux/graphql/joke/types';
import Alert from '../../common/message/Alert';
import WrappedTooltips from '../../common/message/WrappedTooltips';

function JokeQLGenerator() {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSkipped, setIsSkipped] = useState<boolean>(true);
  // skip for prevent fetch data onmount
  const [jokeOptions, setJokeOptions] = useState<JokeQLOptions>({
    id: true,
    joke: true,
    permalink: true,
  });
  const properties = useGetRandomJokeQLQuery(jokeOptions, { skip: isSkipped });

  const { data, error, isLoading, refetch } = properties;
  useEffect(() => {
    if (error && 'error' in error) {
      const message =
        typeof error.error === 'string' ? error.error : 'something went wrong';
      setErrorMessage(message);
    } else {
      if (error) {
        setErrorMessage('something went wrong');
      }
    }
  }, [error]);
  useEffect(() => {
    if (data) {
      const { id, joke, permalink } = data;
      const content = `${id ? 'joke id: ' + id + '\r\n' : ''} ${
        joke ? joke + '\r\n' : ''
      } ${permalink ? 'joke link: ' + permalink : ''}`;

      dispatch(
        createOneTodo({
          id: v4uuid(),
          title: 'Read a joke',
          content,
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
  function onOptionChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setIsSkipped(true); // prevent fetch data while selecting checkbox
    const option = event.target.id as JokeQLKey;
    setJokeOptions({ ...jokeOptions, [option]: !jokeOptions[option] });
  }
  return (
    <Form className="fetch-joke-options">
      <Alert setMessage={setErrorMessage} message={errorMessage} />
      <WrappedTooltips
        content="Fetch a thrid party joke graphql API with redux toolkit query. There are 3 radio options that are used to configure the graphql query"
        placement="top"
      >
        <Button
          className="todo-button"
          style={{ margin: '1rem' }}
          onClick={generateTodoJoke}
        >
          Fetch Joke graphql
        </Button>
      </WrappedTooltips>
      <div className="check-group">
        <Form.Check
          inline
          label="joke id"
          id="id"
          name="jokeId"
          disabled={!jokeOptions['joke'] && !jokeOptions['permalink']}
          checked={jokeOptions['id']}
          onChange={onOptionChange}
        ></Form.Check>
        <Form.Check
          inline
          label="joke content"
          id="joke"
          name="joke content"
          checked={jokeOptions['joke']}
          disabled={!jokeOptions['id'] && !jokeOptions['permalink']}
          onChange={onOptionChange}
        ></Form.Check>
        <Form.Check
          inline
          label="permalink"
          id="permalink"
          name="permalink"
          checked={jokeOptions['permalink']}
          disabled={!jokeOptions['id'] && !jokeOptions['joke']}
          onChange={onOptionChange}
        ></Form.Check>
      </div>
    </Form>
  );
}

export default JokeQLGenerator;
