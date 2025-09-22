import { Box, Button, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { color } from "../../constants/color";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { useGetCurUserLoginQRY } from "../Login/components/LoginForm";
import { useQuery } from "@tanstack/react-query";
import type { IProductType } from "../../constants/products";

const useGetOrderQRY = () => {
  return useQuery<IProductType[] | undefined>({
    queryKey: ["order"],
    queryFn: () => [],
  });
};

export const PagePayment = () => {
  const { t } = useTranslation();
  const { data: curUser } = useGetCurUserLoginQRY();
  const { data = [] } = useGetOrderQRY();

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          maxWidth: "1180px",
          m: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            borderRadius: "0.5rem",
            gap: "1rem",
            p: "2rem",
            width: "100%",
            mt: "2rem",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "6px",
              color: color.background,
            }}
          >
            <LocationPinIcon />
            <Typography variant="h6">
              <b>{t("Shipping address")}</b>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="subtitle1">
                <b>
                  {curUser?.username} {curUser?.phone}
                </b>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                {curUser?.address.street}, {curUser?.address.city},{" "}
                {curUser?.address.state}, {curUser?.address.postalCode},{" "}
                {curUser?.address.country}
              </Typography>
            </Box>
            <Box>
              <Button>change</Button>
            </Box>
          </Box>
        </Box>

        {data?.map((order) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "white",
              borderRadius: "0.5rem",
              gap: "1rem",
              p: "2rem",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Box>
              <img
                src={order.image}
                style={{ width: "60px", height: "40px", objectFit: "cover" }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};
