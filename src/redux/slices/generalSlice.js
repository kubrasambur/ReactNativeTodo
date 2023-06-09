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
      state.list = state.list.filter((list) => list.id !== action.payload.id);
    },
    completeList: (state, action) => {
      state.list.forEach((list) => {
        if (list.id === action.payload.id) {
          list.completed = true;
        }
        if (list.completed) {
          list.todos.forEach((todo) => {
            todo.completed = true;
          });
        }
      });
    },
    removeCompleteList: (state, action) => {
      state.list.forEach((list) => {
        if (list.id === action.payload.id) {
          list.completed = false;
        }
        if (list.completed) {
          list.todos.forEach((todo) => {
            todo.completed = false;
          });
        }
      });
    },
    editListName: (state, action) => {
      state.list.forEach((list) => {
        if (list.id === action.payload.id) {
          list.title = action.payload.title;
        }
      });
    },
    addTodo: (state, action) => {
      state.list.forEach((list) => {
        if (list.title === action.payload.listName) {
          list.todos.push(action.payload);
        }
      });
    },
    removeTodo: (state, action) => {
      state.list.forEach((list) => {
        if (list.title === action.payload.listName) {
          list.todos = list.todos.filter(
            (todo) => todo.id !== action.payload.id
          );
        }
      });
    },
    completeTodo: (state, action) => {
      state.list.forEach((list) => {
        if (list.title === action.payload.listName) {
          list.todos.forEach((todo) => {
            if (todo.id === action.payload.id) {
              todo.completed = true;
            }
          });
        }
      });
    },
    removeCompletedTodo: (state, action) => {
      state.list.forEach((list) => {
        if (list.title === action.payload.listName) {
          list.todos.forEach((todo) => {
            if (todo.id === action.payload.id) {
              todo.completed = false;
            }
          });
        }
      });
    },

    editTodo: (state, action) => {
      state.list.forEach((list) => {
        if (list.title === action.payload.listName) {
          list.todos.forEach((todo) => {
            if (todo.id === action.payload.id) {
              todo.title = action.payload.title;
              todo.description = action.payload.description;
            }
          });
        }
      });
    },
    setAsyncStorage: (state, action) => {
      console.log("action.payload", action.payload);
      state.list = action.payload;
    },
  },
});

export const {
  addList,
  removeList,
  addTodo,
  removeTodo,
  completeTodo,
  editTodo,
  completeList,
  editListName,
  removeCompletedTodo,
  removeCompleteList,
  setAsyncStorage,
} = generalSlice.actions;

export default generalSlice.reducer;
