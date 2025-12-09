import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateColumn } from "../redux/boardSlice";

export default function EditColumnModal({ open, onClose, column }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FFCDC9");

  // وقتی مودال باز شد یا ستون عوض شد، مقدار اولیه فرم رو از ستون بگیر
  useEffect(() => {
    if (open && column) {
      setTitle(column.title || "");
      setColor(column.color || "#FFCDC9");
    }
  }, [open, column]);

  const handleSubmit = () => {
    if (!title.trim() || !column) return;

    dispatch(
      updateColumn({
        id: column.id,
        title,
        color,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Column</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Column title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <TextField
            label="Color (hex)"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            helperText=":#FFCDC9"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
