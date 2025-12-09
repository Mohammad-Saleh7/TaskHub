import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  columns: [
    { id: "todo", title: "To Do", color: "#FFCDC9" },
    { id: "inProgress", title: "In Progress", color: "#FFF2C6" },
    { id: "done", title: "Done", color: "#D6F4ED" },
  ],
  tasks: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare({ columnId, title, description }) {
        return {
          payload: {
            id: nanoid(),
            columnId,
            title,
            description,
          },
        };
      },
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    moveTask(state, action) {
      const { id, columnId } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.columnId = columnId;
      }
    },
    addColumn: {
      reducer(state, action) {
        state.columns.push(action.payload);
      },
      prepare({ title, color }) {
        return {
          payload: {
            id: nanoid(),
            title,
            color: color || "#E0E0E0",
          },
        };
      },
    },
    deleteColumn(state, action) {
      const columnId = action.payload;
      state.columns = state.columns.filter((col) => col.id !== columnId);
      state.tasks = state.tasks.filter((t) => t.id !== columnId);
    },
    updateColumn(state, action) {
      const { id, title, color } = action.payload;
      const column = state.columns.find((col) => col.id === id);
      if (column) {
        column.title = title ?? column.title;
        column.color = color ?? column.color;
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  moveTask,
  addColumn,
  deleteColumn,
  updateColumn,
} = boardSlice.actions;

export const selectColumns = (state) => state.board.columns;
export const selectTasks = (state) => state.board.tasks;

export default boardSlice.reducer;
