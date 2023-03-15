import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      title: "Home",
      todos: [{ id: 1, title: "Home Todo" }],
    },
    {
      id: 2,
      title: "School",
      todos: [
        { id: 1, title: "School Todo" },
        { id: 2, title: "School Todo 2" },
      ],
    },
    {
      id: 3,
      title: "Work",
      todos: [
        { id: 1, title: "Work Todo" },
        { id: 2, title: "Work Todo 2" },
        { id: 3, title: "Work Todo 3" },
      ],
    },
  ],
  status: "idle",
  error: null,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.list.push(action.payload);
    },
    removeList: (state, action) => {
      state.list = state.list.filter((list) => list.id !== action.payload);
    },
    addTodo: (state, action) => {
      state.list.todos = state.list.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.list.todos = state.list.todos.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

export const { addList, removeList, addTodo, removeTodo } =
  generalSlice.actions;

export default generalSlice.reducer;
