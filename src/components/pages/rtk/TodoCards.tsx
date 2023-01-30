import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import TodoCard from './TodoCard';
import './todo-cards.scss';

function TodoCards() {
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  function mapTodoCards() {
    return todos.map((todo) => <TodoCard key={todo.id} todoState={todo} />);
  }
  return <div className="todo-cards-group">{mapTodoCards()}</div>;
}

export default TodoCards;
