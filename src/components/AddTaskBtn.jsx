import { Box, Button } from "@mui/material";

export default function AddTaskBtn() {
  return (
    <div>
      <Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#F9F8F6",
            color: "black",
            width: "160px",
          }}
        >
          + Add Task
        </Button>
      </Box>
    </div>
  );
}
