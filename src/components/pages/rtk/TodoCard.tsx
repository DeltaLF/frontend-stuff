import React from 'react';
import Card from 'react-bootstrap/Card';
import { TodoState } from '../../../redux/features/todos/todosSlice';

type TodoCardType = { todoState: TodoState };

function TodoCard({ todoState }: TodoCardType) {
  const { title, content, id, createAt } = todoState;
  const parsedTime = new Date(createAt);
  return (
    <Card className="todo-card">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{content}</p>
          <footer className="blockquote-footer">
            created at <span>{parsedTime.toISOString()}</span>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}
export default TodoCard;
