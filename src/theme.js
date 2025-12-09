import { createTheme } from "@mui/material";
const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: { main: "#007FF" },
        background: {
          default: "#ffffffff",
          lightPaper: "#eeebebff",
        },
        navbar: {
          default: "#CBCBCB",
        },
        text: {
          lightPrimary: "#000000ff",
        },
      },
    },

    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#222831",
          darkPaper: "#393E46",
          darkPaper2: "#a4a7a8ff",
        },
        navbar: {
          default: "#393E46",
        },
        text: {
          primary: "#EEEEEE",
          secondary: "#393E46",
        },
      },
    },
  },
});

export default theme;
