import { useState, useEffect, use } from "react";
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
import { updateColumn } from "../redux/boardSlice";
import { t } from "i18next";

export default function EditColumnModal({ open, onClose, column }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FFCDC9");

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
      <DialogTitle>{t("columns.edit")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label={t("columns.label")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          />
          <TextField
            label={t("columns.color")}
            value={color}
            onChange={(e) => setColor(e.target.value)}
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
