import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import { Box } from "@mui/material";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Board />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </div>
  );
}
