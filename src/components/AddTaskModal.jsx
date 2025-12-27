import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/boardSlice";
import { t } from "i18next";

export default function AddTaskModal({ open, onClose, columnId }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
    }
  }, [open, columnId]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    dispatch(addTask({ columnId, title, description }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("task.title")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label={t("task.title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          />
          <TextField
            label={t("task.description")}
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("task.cancel")}</Button>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
          }}
        >
          {t("task.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
