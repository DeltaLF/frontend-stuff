import React from 'react';
import Card from 'react-bootstrap/Card';
import { TodoState } from '../../../redux/features/todos/todosSlice';
import './todo-card.scss';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteOneTodo } from '../../../redux/features/todos/todosSlice';
import UpdateTodo from './UpdateTodo';

type TodoCardType = { todoState: TodoState };

function TodoCard({ todoState }: TodoCardType) {
  const dispatch = useAppDispatch();
  const { title, content, id, createAt } = todoState;
  const parsedTime = new Date(createAt);
  function handleDeleteTodo(): void {
    dispatch(deleteOneTodo(id));
  }
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
        <UpdateTodo todoState={todoState} />
        <Button aria-label="Delete" onClick={handleDeleteTodo} variant="danger">
          <div>&#120;</div>
        </Button>
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
