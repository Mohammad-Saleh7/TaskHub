import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Setting from "./Setting";
import { t } from "i18next";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    navigate("/login");
    setAnchorEl(null);
  };
  const handleLogin = () => {
    navigate("auth/login");
    setAnchorEl(null);
  };
  const handleSignUp = () => {
    navigate("auth/signup");
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogin}> {t("login.login")} </MenuItem>
      <MenuItem onClick={handleSignUp}>{t("login.signUp")}</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "dark" ? "navbar.default" : "navbar.default",
          color: "black",
        })}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
            }}
          >
            {t("navbar.title")}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <IconButton
                size="large"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "text.primary"
                      : "text.lightPrimary",
                }}
              >
                <Setting />
              </IconButton>
            </Box>

            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "text.primary"
                      : "text.lightPrimary",
                }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
