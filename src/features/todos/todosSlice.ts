import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

enum TodoPhase {
  pending = 'pending',
  processing = 'processing',
  finished = 'finished',
  canceled = 'canceled',
}

interface TodoState {
  id: string;
  title: string;
  content: string;
  phase?: TodoPhase;
  createAt: number; // new Date().getTime()
}

interface TodosState {
  todos: TodoState[];
}

const initialState: TodosState = { todos: [] };

export const todosSlice = createSlice({
  name: ' todos',
  initialState,
  reducers: {
    createOneTodo: (state, action: PayloadAction<TodoState>) => {
      const newTodo = action.payload;
      newTodo.phase = TodoPhase.pending;
      state.todos = [...state.todos, newTodo];
    },
    deleteOneTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    clearAllTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { createOneTodo, deleteOneTodo, clearAllTodos } =
  todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;
