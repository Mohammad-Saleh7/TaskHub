import { Box, Button, Container, Typography } from "@mui/material";
import Header from "../components/Header";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddTaskBtn from "../components/AddTaskBtn";

export default function Board() {
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
          <Typography>Board Page</Typography>
          <Button variant="contained">+ Column</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
          <Box
            sx={{
              bgcolor: "#FFCDC9",
              minWidth: "300px",
              px: 1,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography>To Do</Typography>
              <MoreHorizIcon />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}
            >
              <AddTaskBtn />
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#FFF2C6",
              minWidth: "300px",
              px: 1,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography>In Progress</Typography>
              <MoreHorizIcon />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}
            >
              <AddTaskBtn />
            </Box>
          </Box>
          <Box
            sx={{
              minWidth: "300px",
              bgcolor: "#D6F4ED",
              px: 1,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Typography>Done</Typography>
              <MoreHorizIcon />
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}
            >
              <AddTaskBtn />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
