import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
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
