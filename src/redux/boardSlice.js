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
    moveTaskToDone(state, action) {
      const id = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.columnId = "done";
      }
    },
  },
});

export const { addTask, deleteTask, moveTaskToDone } = boardSlice.actions;

export const selectColumns = (state) => state.board.columns;
export const selectTasks = (state) => state.board.tasks;

export default boardSlice.reducer;
