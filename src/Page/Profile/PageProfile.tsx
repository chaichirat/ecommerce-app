import { Avatar, Box, Button, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useRouter } from "../../router";
import { useGetCurUserQRY } from "../Login/components/LoginForm";
import { color } from "../../constants/color";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { paths } from "../../constants/paths";

export const PageProfile = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: curUser } = useGetCurUserQRY();

  const pathProfileEdit = useCallback(
    () => router.push(paths.profileEdit),
    [router]
  );

  return (
    <>
      <Header />
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
              display: { xs: "none", sm: "flex" },
              justifyContent: "end",
              width: "100%",
            }}
          >
            <Button variant="contained" onClick={pathProfileEdit}>
              {t("button.Edit")}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
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
                alignItems: "start",
                gap: "1rem",
              }}
            >
              <Typography variant="h6">
                <b>Name:</b> {curUser?.name}
              </Typography>
              <Typography variant="h6">
                <b>Phone number:</b> {curUser?.phone}
              </Typography>
              <Typography variant="h6">
                <b>Address:</b> {curUser?.address.street},{" "}
                {curUser?.address.city}, {curUser?.address.state},{" "}
                {curUser?.address.postalCode}, {curUser?.address.country}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "end",
              width: "100%",
              mt: "2rem",
            }}
          >
            <Button variant="contained" onClick={pathProfileEdit}>
              {t("button.Edit")}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
