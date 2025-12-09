import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import ModeToggle from "./ModeToggle";
import { Box, Divider, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

export default function Setting() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { i18n } = useTranslation();

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SettingsIcon
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <ModeToggle />
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            onClick={() => changeLang("fa")}
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
            }}
          >
            {t("setting.persian")}
          </Button>
          <Button
            onClick={() => changeLang("en")}
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
            }}
          >
            {t("setting.english")}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}
