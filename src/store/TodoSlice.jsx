import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return { Todo: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { Todo: [] };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const TodoSlice = createSlice({
  name: 'Todo',
  initialState: loadState(),
  reducers: {
    addTask: (state, action) => {
      state.Todo.push(action.payload);
      saveState(state);
    },
    removeTask: (state, action) => {
      state.Todo = state.Todo.filter(task => task.id !== action.payload.id);
      saveState(state);
    },
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.Todo.find(task => task.id === id);
      if (task) {
        task.text = text;
        saveState(state);
      }
    },
  },
});

export const { addTask, removeTask, editTask } = TodoSlice.actions;
export default TodoSlice.reducer;
