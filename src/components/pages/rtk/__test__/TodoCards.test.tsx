import { render, screen, waitFor } from '../../../../utils/test-utils';
import Cards from '../../../common/cards/Cards';
import TodoCard from '../../../common/cards/todo-card/TodoCard';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { v4 as uuidv4 } from 'uuid';
import {
  TodoState,
  TodoPhase,
} from '../../../../redux/features/todos/todosSlice';

describe('tests Cards can access data from todoSlice and render it', () => {
  const title = 'first test todo title';
  const content = 'first test todo content';
  const todoInstance: TodoState = {
    id: uuidv4(),
    createAt: new Date().getTime(),
    phase: TodoPhase.pending,
    title,
    content,
  };
  it('renders one cards', () => {
    render(
      <Cards
        dataArr={[todoInstance, todoInstance, todoInstance]}
        renderCard={(data) => <TodoCard todoState={data} />}
      />,
      {
        preloadedState: {
          todos: { todos: [todoInstance, todoInstance, todoInstance] },
        },
      }
    );
    const titleElements = screen.getAllByText(title);
    expect(titleElements).toHaveLength(3);

    const contentElements = screen.getAllByText(content);
    expect(contentElements).toHaveLength(3);
  });
});
