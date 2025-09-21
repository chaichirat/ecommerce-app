import { Box, Button } from "@mui/material";
import { color } from "../../../constants/color";
import { useTranslation } from "react-i18next";

export const ShopBox = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "sticky",
          bottom: 0,
          maxWidth: "1180px",
          width: "100%",
          height: "100px",
          bgcolor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.3)",
          boxSizing: "border-box",
          p: "14px 16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: color.background,
              width: "160px",
            }}
          >
            {t("button.Buy")}
          </Button>
        </Box>
      </Box>
    </>
  );
};
