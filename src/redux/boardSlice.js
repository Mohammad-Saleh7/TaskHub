import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  columns: [
    { id: "todo", title: "To Do", color: "#FFCDC9" },
    { id: "inProgress", title: "In Progress", color: "#FFF2C6" },
    { id: "done", title: "Done", color: "#D6F4ED" },
  ],
  tasks: [],
};

const boardSlice