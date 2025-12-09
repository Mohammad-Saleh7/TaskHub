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
import { addColumn } from "../redux/boardSlice";

export default function AddColumnModal({ open, onClose }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FFCDC9"); // رنگ پیش‌فرض

  // هر بار مودال باز شد فرم خالی شود
  useEffect(() => {
    if (open) {
      setTitle("");
      setColor("#FFCDC9");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    dispatch(addColumn({ title, color }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Column</DialogTitle>
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
            helperText=" #FFCDC9"
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
