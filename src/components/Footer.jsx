// Footer.jsx
import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { t } from "i18next";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        bgcolor:
          theme.palette.mode === "dark" ? "navbar.default" : "navbar.default",
        px: 4,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 14,
      })}
    >
      <Typography
        variant="body2"
        sx={(theme) => ({
          color:
            theme.palette.mode === "dark"
              ? "text.primary"
              : "text.lightPrimary",
        })}
      >
        © {new Date().getFullYear()} {t("footer.taskHub")}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography
          variant="body2"
          sx={(theme) => ({
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
          })}
        >
          {t("footer.title")} <b>{t("footer.name")}</b>
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
