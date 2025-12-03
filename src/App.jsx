import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import { Box } from "@mui/material";

export default function App() {
  return (
    <div>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Board />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}
