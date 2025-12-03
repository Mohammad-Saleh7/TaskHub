// AddTaskBtn.jsx
import { Button } from "@mui/material";

export default function AddTaskBtn({ onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{ bgcolor: "#F9F8F6", color: "black", width: 160 }}
    >
      + ADD TASK
    </Button>
  );
}
