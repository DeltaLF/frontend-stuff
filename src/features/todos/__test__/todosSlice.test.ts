import { store } from '../../../app/store';
import { createOneTodo, deleteOneTodo, deleteAllTodos } from '../todosSlice';
import { v4 as uuidv4 } from 'uuid';

describe('Todos redux state tests', () => {
  const dispatch = store.dispatch;
  const todoId = uuidv4();
  const todoCreateAt = new Date().getTime();
  const todoObj = {
    id: todoId,
    title: 'test',
    content: 'jest',
    createAt: todoCreateAt,
  };
  const todoObjII = {
    id: uuidv4(),
    title: 'test',
    content: 'jest',
    createAt: todoCreateAt,
  };

  const todoObjIII = {
    id: uuidv4(),
    title: 'test',
    content: 'jest',
    createAt: todoCreateAt,
  };
  it('tests the initial state', () => {
    const state = store.getState();
    expect(state.todos).toEqual({ todos: [] });
  });
  it('tests create one action', async () => {
    await dispatch(createOneTodo(todoObj));
    const state = store.getState();
    const todos = state.todos.todos;

    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual(todoObj);
  });
  it('tests delete one action', async () => {
    const stateOrig = store.getState();
    const todosOrig = stateOrig.todos.todos;
    expect(todosOrig).toHaveLength(1);

    await dispatch(deleteOneTodo(todoObj.id));
    const state = store.getState();
    const todos = state.todos.todos;
    expect(todos).toHaveLength(0);
  });
  it('tests delete all  action', async () => {
    await dispatch(createOneTodo(todoObjII));
    await dispatch(createOneTodo(todoObjIII));
    const stateOrig = store.getState();
    const todosOrig = stateOrig.todos.todos;
    expect(todosOrig).toHaveLength(2);

    // clear all
    await dispatch(deleteAllTodos());
    const state = store.getState();
    const todos = state.todos.todos;
    expect(todos).toHaveLength(0);
  });
});
