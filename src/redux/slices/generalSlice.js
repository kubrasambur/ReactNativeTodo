import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
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
      state.list.forEach((list) => {
        if (list.title === action.payload.listName) {
          list.todos.push(action.payload);
        }
      });
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
