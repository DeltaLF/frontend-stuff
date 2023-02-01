import React from 'react';
import Container from 'react-bootstrap/Container';
import TodoCards from './TodoCards';
import TodoFormComponent from './TodoFormComponent';
import JokeGenerator from './joke-generator';

const RTKpage = () => {
  return (
    <div>
      <h1>RTK page</h1>
      <TodoFormComponent />
      <JokeGenerator />
      <Container className="mt-3 mb-3">
        <TodoCards />
      </Container>
    </div>
  );
};

export default RTKpage;
