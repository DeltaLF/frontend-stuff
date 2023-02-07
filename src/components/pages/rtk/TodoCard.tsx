import React from 'react';
import Card from 'react-bootstrap/Card';
import { TodoState } from '../../../redux/features/todos/todosSlice';
import './todo-card.scss';
import Button from 'react-bootstrap/Button';

type TodoCardType = { todoState: TodoState };

function TodoCard({ todoState }: TodoCardType) {
  const { title, content, id, createAt } = todoState;
  const parsedTime = new Date(createAt);
  function renderContent(content: string) {
    const jokeUrlInd = content.indexOf(
      'joke link: https://icanhazdadjoke.com/'
    );
    if (jokeUrlInd === -1) {
      return <p>{content}</p>;
    }
    const jokeUrl = content.substring(jokeUrlInd + 11);
    return (
      <p>
        {content.substring(0, jokeUrlInd)}
        <a href={jokeUrl}>
          <Button variant="outline-primary" size="sm">
            Source
          </Button>
        </a>
      </p>
    );
  }
  return (
    <Card className="todo-card">
      <Card.Header>
        <h5> {title}</h5>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          {renderContent(content)}
          <footer className="blockquote-footer">
            created at <span>{parsedTime.toISOString()}</span>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}
export default TodoCard;
