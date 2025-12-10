import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const helperTextKeys = {
    email: {
      required: "login.emailRequired",
      pattern: "login.emailInvalid",
    },
    password: {
      required: "login.passwordRequired",
      pattern: "login.passwordPattern",
    },
  };

  const onSubmit = (data) => {
    console.log(data);
    if (data.email && data.password) {
      alert(t("login.welcome"));
      navigate("/");
      reset();
    } else {
      alert(t("login.enterInputs"));
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 8,
      }}
    >
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component={"form"}
        sx={{
          width: 450,
          height: 480,
          bgcolor:
            theme.palette.mode === "dark"
              ? "background.darkPaper"
              : "navbar.default",
          borderRadius: 2,
          p: 2,
          boxShadow:
            " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <Typography
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
            textAlign: "center",
            mt: 2,
            fontWeight: "bold",
            fontSize: "26px",
          }}
        >
          {t("login.login")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                mb: 1,
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
              }}
            >
              {t("login.emailLabel")}
            </Typography>
            <TextField
              sx={{ width: "350px" }}
              id="login-email"
              label={t("login.emailPlaceholder")}
              variant="outlined"
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
              error={!!errors.email}
              {...register("email", {
                required: true,
                pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              })}
            />
            {errors.email && (
              <Typography color="error" variant="caption">
                {t(helperTextKeys.email[errors.email.type])}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                mb: 1,
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
              }}
            >
              {t("login.passwordLabel")}
            </Typography>
            <TextField
              sx={{ width: "350px" }}
              id="login-password"
              label={t("login.passwordPlaceholder")}
              variant="outlined"
              type="password"
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
              error={!!errors.password}
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
              })}
            />
            {errors.password && (
              <Typography color="error" variant="caption">
                {t(helperTextKeys.password[errors.password.type])}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "350px",
                bgcolor:
                  theme.palette.mode === "light"
                    ? "background.background2"
                    : "background.darkPaper2",
              }}
            >
              {t("login.login")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
