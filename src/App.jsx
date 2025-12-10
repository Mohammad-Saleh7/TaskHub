import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import { Box, useTheme } from "@mui/material";
import Auth from "./pages/Auth";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Board />} />
              <Route path="/auth/" element={<Auth />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
            </Routes>
            <Footer />
          </Box>
        </Box>
      </BrowserRouter>
    </div>
  );
}
