import React from 'react';
import Container from 'react-bootstrap/Container';
import JokeQueryGenerator from './JokeQueryGenerator';
import JokeQLGenerator from './JokeQLGenerator';
import TodoCards from './TodoCards';
import CreateTodo from './CreateTodo';
import JokeThunkGenerator from './JokeThunkGenerator';
import './rtkPage.scss';

const RTKpage = () => {
  return (
    <div className="rtk-page">
      <h1>RTK page</h1>
      <h3>Add a new todo task</h3>
      <CreateTodo />
      <JokeQueryGenerator />
      <JokeThunkGenerator />
      <JokeQLGenerator />

      {/* <TodoFormComponent /> */}
      <Container className="mt-3 mb-3">
        <TodoCards />
      </Container>
    </div>
  );
};

export default RTKpage;
