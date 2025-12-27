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
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
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
    // اگر ولیدیشن fail بشه، این تابع اصلاً اجرا نمی‌شه
    alert(t("login.welcome"));
    reset(); // قبل از navigate که اثرش دیده بشه
    navigate("/");
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
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: 450,
          height: 480,
          bgcolor:
            theme.palette.mode === "dark"
              ? "background.darkPaper"
              : "navbar.default",
          borderRadius: 2,
          p: 3,
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
            mt: 1,
            mb: 2,
            fontWeight: "bold",
            fontSize: "26px",
          }}
        >
          {t("login.login")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: 350 }}
            id="login-email"
            label={t("login.emailPlaceholder")}
            variant="outlined"
            autoComplete="email"
            inputMode="email"
            InputLabelProps={{
              style: { color: theme.palette.text.primary },
            }}
            error={!!errors.email}
            helperText={
              errors.email ? t(helperTextKeys.email[errors.email.type]) : " "
            }
            {...register("email", {
              required: true,
              pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            })}
          />

          <TextField
            sx={{ width: 350 }}
            id="login-password"
            label={t("login.passwordPlaceholder")}
            type="password"
            variant="outlined"
            autoComplete="current-password"
            InputLabelProps={{
              style: { color: theme.palette.text.primary },
            }}
            error={!!errors.password}
            helperText={
              errors.password
                ? t(helperTextKeys.password[errors.password.type])
                : " "
            }
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
            })}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              width: 350,
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
    </Container>
  );
}
