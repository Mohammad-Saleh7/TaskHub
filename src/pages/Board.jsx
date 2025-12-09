import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import PendingActionsIcon from "@mui/icons-material/PendingActions"; //
import ReplayIcon from "@mui/icons-material/Replay";

import Header from "../components/Header";
import AddTaskBtn from "../components/AddTaskBtn";
import AddTaskModal from "../components/AddTaskModal";
import AddColumnModal from "../components/AddColumnModal";
import EditColumnModal from "../components/EditColumnModal";

import { useDispatch, useSelector } from "react-redux";
import { selectColumns, selectTasks } from "../redux/boardSlice";
import { deleteTask, moveTask, deleteColumn } from "../redux/boardSlice";
import Footer from "../components/Footer";
import { t } from "i18next";

export default function Board() {
  const columns = useSelector(selectColumns);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const theme = useTheme();
  // {Add Task Modal}
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);

  const handleOpenModal = (columnId) => {
    setActiveColumnId(columnId);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveColumnId(null);
  };
  // {Add Task Modal}

  // {Add Column Modal}
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const handleOpenColumnModal = () => {
    setColumnModalOpen(true);
  };
  const handleCloseColumnModal = () => {
    setColumnModalOpen(false);
  };
  // {Add Column Modal}

  const [editColumnModalOpen, setEditColumnModalOpen] = useState(false);
  const [columnMenuAnchor, setColumnMenuAnchor] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const handleCloseColumnMenu = () => {
    setColumnMenuAnchor(null);
  };

  const handleOpenColumnMenu = (event, columnId) => {
    setColumnMenuAnchor(event.currentTarget);
    setSelectedColumnId(columnId);
  };
  const handleOpenEditColumn = () => {
    setEditColumnModalOpen(true);
    handleCloseColumnMenu();
  };

  const handleCloseEditColumn = () => {
    setEditColumnModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleMoveTask = (id, newColumnId) => {
    dispatch(moveTask({ id, columnId: newColumnId }));
  };

  const handleDeleteColumn = () => {
    if (!selectedColumnId) return;
    dispatch(deleteColumn(selectedColumnId));
    handleCloseColumnMenu();
  };

  const selectedColumn = columns.find((col) => col.id === selectedColumnId);

  return (
    <div>
      <Header />

      <Container
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            {t("board.pageTitle")}{" "}
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpenColumnModal}
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "background.darkPaper"
                  : "background.lightPpaer",
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
              width: 160,
            }}
          >
            {t("board.addColumn")}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            mt: 5,
            flexWrap: "wrap",
          }}
        >
          {columns.map((column) => {
            const columnTasks = tasks.filter((t) => t.columnId === column.id);

            return (
              <Box
                key={column.id}
                sx={{
                  bgcolor: column.color,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  color:
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "text.lightPrimary",
                  minWidth: 300,
                  px: 2,
                  py: 2,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight={600}>{t(column.titleKey)}</Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleOpenColumnMenu(e, column.id)}
                  >
                    <MoreHorizIcon
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? "text.secondary"
                            : "text.lightPrimary",
                      }}
                    />
                  </IconButton>
                </Box>

                {columnTasks.map((task) => (
                  <Paper
                    key={task.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      color: theme.palette.mode === "dark" ? "black" : "none",
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "background.darkPaper2"
                          : "background.lightPaper",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography fontWeight={600}>{task.title}</Typography>
                      {task.description && (
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {task.description}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {column.id === "todo" && (
                        <PendingActionsIcon
                          onClick={() => handleMoveTask(task.id, "inProgress")}
                          sx={{ color: "#FFF2C6", cursor: "pointer" }}
                        />
                      )}

                      {column.id === "inProgress" && (
                        <CheckCircleOutlineIcon
                          onClick={() => handleMoveTask(task.id, "done")}
                          sx={{ color: "#D6F4ED", cursor: "pointer" }}
                        />
                      )}

                      {column.id === "done" && (
                        <>
                          <ReplayIcon
                            onClick={() =>
                              handleMoveTask(task.id, "inProgress")
                            }
                            sx={{ color: "#FFF2C6", cursor: "pointer" }}
                          />

                          <CloseIcon
                            onClick={() => handleMoveTask(task.id, "todo")}
                            sx={{
                              color: "#FFCDC9",
                              cursor: "pointer",
                              borderBottom: "2px solid #FFCDC9",
                            }}
                          />
                        </>
                      )}

                      <DeleteOutlineOutlinedIcon
                        onClick={() => handleDeleteTask(task.id)}
                        sx={{
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Paper>
                ))}

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <AddTaskBtn onClick={() => handleOpenModal(column.id)} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
      <Footer />

      <AddTaskModal
        open={modalOpen}
        onClose={handleCloseModal}
        columnId={activeColumnId}
      />
      <AddColumnModal open={columnModalOpen} onClose={handleCloseColumnModal} />

      <Menu
        anchorEl={columnMenuAnchor}
        open={Boolean(columnMenuAnchor)}
        onClose={handleCloseColumnMenu}
      >
        <MenuItem onClick={handleOpenEditColumn}>{t("columns.edit")}</MenuItem>
        <MenuItem onClick={handleDeleteColumn}>{t("columns.delete")}</MenuItem>
      </Menu>

      <EditColumnModal
        open={editColumnModalOpen}
        onClose={handleCloseEditColumn}
        column={selectedColumn}
      />
    </div>
  );
}
