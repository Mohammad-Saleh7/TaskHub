// AddTaskBtn.jsx
import { Button, useTheme } from "@mui/material";

export default function AddTaskBtn({ onClick }) {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        bgcolor:
          theme.palette.mode === "dark"
            ? "background.darkPaper"
            : "background.lightPpaer",
        color:
          theme.palette.mode === "dark" ? "text.primary" : "text.lightPrimary",
      }}
    >
      + ADD TASK
    </Button>
  );
}
