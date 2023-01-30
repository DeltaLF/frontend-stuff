import React from 'react';
import Container from 'react-bootstrap/Container';
import TodoComponent from '../../../features/todos/Todos';
import TodoCards from './TodoCards';
import TodoFormComponent from './TodoFormComponent';

const RTKpage = () => {
  return (
    <div>
      <h1>RTK page</h1>
      <TodoFormComponent />
      <Container className="mt-3 mb-3">
        <TodoCards />
      </Container>
    </div>
  );
};

export default RTKpage;
