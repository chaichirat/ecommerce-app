import { Box, Button, Checkbox, Typography } from "@mui/material";
import { color } from "../../../constants/color";
import { useTranslation } from "react-i18next";
import type { ChangeEvent } from "react";

type IShopBoxProps = {
  onBuying: () => void;
  indeterminate: boolean;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  total: number;
};

export const ShopBox = (props: IShopBoxProps) => {
  const { onBuying, indeterminate, checked, onChange, total } = props;
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
          height: "auto",
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
            justifyContent: "space-between",
            alignItems: "end",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              indeterminate={indeterminate}
              checked={checked}
              onChange={onChange}
              sx={{
                "&.Mui-checked": {
                  color: color.background,
                },
                "&.MuiCheckbox-indeterminate": {
                  color: color.background,
                },
              }}
            />
            <Typography sx={{ fontSize: { xs: "12px", sm: "16px" } }}>
              {t("All")}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "0.5rem", sm: "2rem" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <b>{t("Total")}:</b>
              </Typography>
              <Typography
                sx={{
                  color: color.background,
                  fontSize: { xs: "16px", sm: "20px" },
                }}
              >
                ฿{total.toLocaleString()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={onBuying}
              sx={{
                bgcolor: color.background,
                width: "120px",
              }}
            >
              {t("Payment")}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
