// todosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("https://655b587dab37729791a8f460.mockapi.io/api/v1/todo");
  return response.data;
});

export const addNewTodo = createAsyncThunk("todos/addNewTodo", async (title) => {
  const response = await axios.post("https://655b587dab37729791a8f460.mockapi.io/api/v1/todo", { title: title, status: false });
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`https://655b587dab37729791a8f460.mockapi.io/api/v1/todo/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ id, title, status }) => {
  const response = await axios.put(`https://655b587dab37729791a8f460.mockapi.io/api/v1/todo/${id}`, { title: title, status: status });
  return response.data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? { ...todo, ...action.payload } : todo));
      });
  },
});

export default todosSlice.reducer;
