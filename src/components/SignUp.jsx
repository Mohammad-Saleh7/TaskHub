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

export default function SignUp() {
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
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const helperTextKeys = {
    name: {
      required: "login.nameRequired",
      minLength: "login.nameMin",
      maxLength: "login.nameMax",
    },
    lastName: {
      required: "login.lastNameRequired",
      minLength: "login.lastNameMin",
      maxLength: "login.lastNameMax",
    },
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
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: 450,
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
          {t("login.signUp")}
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
            id="signup-name"
            label={t("login.namePlaceholder")}
            variant="outlined"
            InputLabelProps={{
              style: { color: theme.palette.text.primary },
            }}
            error={!!errors.name}
            helperText={
              errors.name ? t(helperTextKeys.name[errors.name.type]) : " "
            }
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 31,
            })}
          />

          <TextField
            sx={{ width: 350 }}
            id="signup-lastname"
            label={t("login.lastNamePlaceholder")}
            variant="outlined"
            InputLabelProps={{
              style: { color: theme.palette.text.primary },
            }}
            error={!!errors.lastName}
            helperText={
              errors.lastName
                ? t(helperTextKeys.lastName[errors.lastName.type])
                : " "
            }
            {...register("lastName", {
              required: true,
              minLength: 2,
              maxLength: 31,
            })}
          />

          <TextField
            sx={{ width: 350 }}
            id="signup-email"
            label={t("login.emailPlaceholder")}
            variant="outlined"
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
            id="signup-password"
            label={t("login.passwordPlaceholder")}
            type="password"
            variant="outlined"
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
            sx={{
              width: 350,
              bgcolor:
                theme.palette.mode === "light"
                  ? "background.background2"
                  : "background.darkPaper2",
            }}
          >
            {t("login.signUp")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
