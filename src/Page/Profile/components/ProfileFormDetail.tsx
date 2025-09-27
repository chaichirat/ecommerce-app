import { Avatar, Box, Button, InputAdornment, Typography } from "@mui/material";
import { TextField } from "../../../components/field-form";
import { useTranslation } from "react-i18next";
import { color } from "../../../constants/color";
import { useGetCurUserQRY } from "../../Login/components/LoginForm";
import { useCallback } from "react";
import { useRouter } from "../../../router";
import { paths } from "../../../constants/paths";

export const ProfileFormDetail = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: curUser } = useGetCurUserQRY();

  const pathProfile = useCallback(() => router.push(paths.profile), []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: "0 auto",
          maxWidth: "1180px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            bgcolor: "white",
            borderRadius: "0.5rem",
            mx: "0.5rem",
            mt: "2rem",
            p: "2rem",
            width: { xs: "100%", sm: "60%" },
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Avatar
                src={curUser?.image}
                sx={{ width: "150px", height: "150px" }}
              />
              <Typography variant="h6" sx={{ color: color.background }}>
                <b>{curUser?.role}</b>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                maxWidth: "470px",
                width: "100%",
              }}
            >
              <TextField name="name" label="Name" />
              <TextField
                name="phone"
                label="Phone number"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">(+66)</InputAdornment>
                    ),
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  mt: "2rem",
                }}
              >
                <Button onClick={pathProfile}>{t("button.Cancel")}</Button>
                <Button variant="contained">{t("button.Save")}</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
