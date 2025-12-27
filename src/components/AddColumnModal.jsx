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
import { addColumn } from "../redux/boardSlice";
import { t } from "i18next";

export default function AddColumnModal({ open, onClose }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#FFCDC9");

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
      <DialogTitle>{t("columns.addColumn")}</DialogTitle>
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
            label={t("modals.columnColor")}
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
