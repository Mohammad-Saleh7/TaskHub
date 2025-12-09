import { useColorScheme, Button, Box } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import { t } from "i18next";

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();

  if (mode === undefined) return null;

  return (
    <Box sx={{ backgroundColor: "transparent" }}>
      <Button
        onClick={() => setMode("light")}
        sx={(theme) => ({
          "&:hover": {
            scale: "1.3",
            transition: "0.5s all",
            bgcolor: "transparent",
          },
          "&:hover .icon": {
            color: "yellow !important",
            transition: "0.5s all",
          },
          display: "flex",
          gap: 1,
          paddingX: 5,
          color:
            theme.palette.mode === "dark"
              ? "text.primary"
              : "text.lightPrimary",
        })}
      >
        <LightModeOutlinedIcon
          sx={(theme) => ({
            fontSize: "18px",
            color:
              theme.palette.mode === "dark"
                ? `${theme.palette.text.primary} !important`
                : `${theme.palette.text.lightPrimary} !important`,
          })}
          className="icon"
        />
        {t("setting.light")}
      </Button>

      <Button
        onClick={() => setMode("dark")}
        sx={(theme) => ({
          "&:hover": {
            scale: "1.3",
            transition: "0.5s all",
            bgcolor: "transparent",
          },
          "&:hover .icon": {
            color: "yellow !important",
            transition: "0.5s all",
          },
          display: "flex",
          gap: 1,
          paddingX: 5,
          color:
            theme.palette.mode === "dark"
              ? "text.primary"
              : "text.lightPrimary",
        })}
      >
        <BedtimeOutlinedIcon
          sx={(theme) => ({
            fontSize: "18px",
            color:
              theme.palette.mode === "dark"
                ? `${theme.palette.text.primary} !important`
                : `${theme.palette.text.lightPrimary} !important`,
          })}
          className="icon"
        />
        {t("setting.dark")}
      </Button>
    </Box>
  );
};

export default ModeToggle;
