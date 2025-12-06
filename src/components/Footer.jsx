// Footer.jsx
import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid #e0e0e0",
        bgcolor: "#CBCBCB",
        px: 4,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 14,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Task Hub
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          Made by <b>Saleh Abbasi</b>
        </Typography>

        <IconButton
          size="small"
          component={Link}
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener"
        >
          <GitHubIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          component={Link}
          href="https://linkedin.com/in/your-username"
          target="_blank"
          rel="noopener"
        >
          <LinkedInIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
