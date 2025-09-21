import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import { TextField } from "../../../components/field-form";
import { useTranslation } from "react-i18next";
import { color } from "../../../constants/color";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as motion from "motion/react-client";
import { useCallback, useState } from "react";

export const LoginFormDetail = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    [showPassword]
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 68px)",
        }}
      >
        <Box sx={{ display: "flex", gap: "4rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "500px",
              p: "2rem",
              boxSizing: "border-box",
              color: "white",
            }}
          >
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h1">
                <b>{t("home.Sunzada")}</b>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1rem",
                  borderRadius: "0.5rem",
                  p: "1rem",
                  mt: "1rem",
                  boxSizing: "border-box",
                  bgcolor: "white",
                  color: color.textLogo,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography variant="h6">
                    <b>Customer</b>
                  </Typography>
                  <Typography>
                    username: sunny
                    <br />
                    password: 1234
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography variant="h6">
                    <b>Merchant</b>
                  </Typography>
                  <Typography>
                    username: owner
                    <br />
                    password: 5678
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              bgcolor: "white",
              borderRadius: "0.5rem",
              width: "400px",
              p: "2rem",
              boxSizing: "border-box",
              boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.32)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h3" sx={{ color: color.textLogo }}>
                <b>{t("login.Login")}</b>
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <TextField name="username" label={t("login.Username")} />
              <TextField
                type={showPassword ? "text" : "password"}
                name="password"
                label={t("login.Password")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon fontSize="small" />
                          ) : (
                            <VisibilityIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", bgcolor: color.background }}
              >
                {t("login.Login")}
              </Button>
              <Box>
                <Link href="#" underline="hover" sx={{ color: color.textLogo }}>
                  <Typography variant="body2">
                    {t("login.Forgot your password")}
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
