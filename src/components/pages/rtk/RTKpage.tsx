import React from 'react';
import Container from 'react-bootstrap/Container';
import JokeQueryGenerator from './JokeQueryGenerator';
import JokeQLGenerator from './JokeQLGenerator';
import Cards from '../../common/cards/Cards';
import CreateTodo from './CreateTodo';
import JokeThunkGenerator from './JokeThunkGenerator';
import './rtkPage.scss';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import TodoCard from '../../common/cards/todo-card/TodoCard';

const RTKpage = () => {
  const todos = useAppSelector((state: RootState) => state.todos.todos);

  return (
    <div className="rtk-page">
      <h1>RTK page</h1>
      <h3>Add a new todo task</h3>
      <CreateTodo />
      <JokeQueryGenerator />
      <JokeThunkGenerator />
      <JokeQLGenerator />

      <Container className="mt-3 mb-3">
        <Cards
          dataArr={todos}
          renderCard={(data) => {
            return <TodoCard todoState={data} />;
          }}
        />
      </Container>
    </div>
  );
};

export default RTKpage;
