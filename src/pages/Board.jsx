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
import PendingActionsIcon from "@mui/icons-material/PendingActions"; // برای inProgress
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

export default function Board() {
  const columns = useSelector(selectColumns);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [columnModalOpen, setColumnModalOpen] = useState(false);

  const [columnMenuAnchor, setColumnMenuAnchor] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

  const [editColumnModalOpen, setEditColumnModalOpen] = useState(false);

  const handleOpenModal = (columnId) => {
    setActiveColumnId(columnId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveColumnId(null);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleMoveTask = (id, newColumnId) => {
    dispatch(moveTask({ id, columnId: newColumnId }));
  };

  const handleOpenColumnModal = () => {
    setColumnModalOpen(true);
  };

  const handleCloseColumnModal = () => {
    setColumnModalOpen(false);
  };

  const handleOpenColumnMenu = (event, columnId) => {
    setColumnMenuAnchor(event.currentTarget);
    setSelectedColumnId(columnId);
  };

  const handleCloseColumnMenu = () => {
    setColumnMenuAnchor(null);
  };

  const handleDeleteColumn = () => {
    if (!selectedColumnId) return;
    dispatch(deleteColumn(selectedColumnId));
    handleCloseColumnMenu();
  };

  const handleOpenEditColumn = () => {
    setEditColumnModalOpen(true);
    handleCloseColumnMenu();
  };

  const handleCloseEditColumn = () => {
    setEditColumnModalOpen(false);
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
            Board Page
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
            + Column
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
                  <Typography fontWeight={600}>{column.title}</Typography>
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
                      {/* To Do → بفرست به InProgress */}
                      {column.id === "todo" && (
                        <PendingActionsIcon
                          onClick={() => handleMoveTask(task.id, "inProgress")}
                          sx={{ color: "#FFF2C6", cursor: "pointer" }}
                        />
                      )}

                      {/* InProgress → بفرست Done */}
                      {column.id === "inProgress" && (
                        <CheckCircleOutlineIcon
                          onClick={() => handleMoveTask(task.id, "done")}
                          sx={{ color: "#D6F4ED", cursor: "pointer" }}
                        />
                      )}

                      {/* Done → حالا ۲ تا دکمه: 
        Replay → InProgress 
        X → ToDo */}
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

                      {/* Delete در همه ستون‌ها */}

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

      {/* منوی سه‌نقطه ستون */}
      <Menu
        anchorEl={columnMenuAnchor}
        open={Boolean(columnMenuAnchor)}
        onClose={handleCloseColumnMenu}
      >
        <MenuItem onClick={handleOpenEditColumn}>Edit column</MenuItem>
        <MenuItem onClick={handleDeleteColumn}>Delete column</MenuItem>
      </Menu>

      {/* مودال ویرایش ستون */}
      <EditColumnModal
        open={editColumnModalOpen}
        onClose={handleCloseEditColumn}
        column={selectedColumn}
      />
    </div>
  );
}
