import { useState } from "react";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Header from "../components/Header";
import AddTaskBtn from "../components/AddTaskBtn";
import AddTaskModal from "../components/AddTaskModal";

import { useSelector } from "react-redux";
import { selectColumns, selectTasks } from "../redux/boardSlice";

export default function Board() {
  const columns = useSelector(selectColumns);
  const tasks = useSelector(selectTasks);

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

  return (
    <div>
      <Header />

      <Container sx={{ mt: 3 }}>
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
          <Button variant="contained">+ Column</Button>
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
                  <MoreHorizIcon />
                </Box>

                {columnTasks.map((task) => (
                  <Paper
                    key={task.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "white",
                    }}
                  >
                    <Typography fontWeight={600}>{task.title}</Typography>
                    {task.description && (
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {task.description}
                      </Typography>
                    )}
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

      <AddTaskModal
        open={modalOpen}
        onClose={handleCloseModal}
        columnId={activeColumnId}
      />
    </div>
  );
}
