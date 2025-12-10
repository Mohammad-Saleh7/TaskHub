import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <div>
            <Outlet />
          </div>
        </Box>
      </Container>
    </div>
  );
}
