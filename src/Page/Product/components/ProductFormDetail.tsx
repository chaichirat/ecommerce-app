import { Box, Button, IconButton } from "@mui/material";
import { ImageField, TextField } from "../../../components/field-form";
import { useTranslation } from "react-i18next";
import { useRouter } from "../../../router";
import { useCallback } from "react";
import { paths } from "../../../constants/paths";
import { useParams } from "react-router-dom";
import { useGetProductByIdQRY } from "../../Home/PageHome";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { color } from "../../../constants/color";

export const ProductFormDetail = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: curProduct } = useGetProductByIdQRY(Number(id));

  const pathMerchant = useCallback(() => router.push(paths.merchant), []);
  const pathDelete = useCallback(
    (id: number) => router.push(paths.delete.replace(":id", id.toString())),
    [router]
  );

  const isView = router.pathname === `/product/view/${id}`;
  const isCreate = router.pathname === paths.create;
  const isEdit = router.pathname === `/product/edit/${id}`;
  const isDelete = router.pathname === `/product/delete/${id}`;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          bgcolor: "white",
          gap: "2rem",
          m: { xs: "0 0.5rem", md: "0 auto" },
          mt: { xs: "16px", md: "48px" },
          p: { xs: "2rem 1rem 0", sm: "2rem 3rem" },
          borderRadius: "0.5rem",
          boxSizing: "border-box",
          maxWidth: { xs: "100%", md: "1180px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageField name="image" disabled={isDelete || isView} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            maxWidth: "470px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <TextField
              name="title"
              label={t("Title")}
              multiline
              disabled={isDelete || isView}
            />
            <TextField
              name="price"
              label={t("Price")}
              disabled={isDelete || isView}
            />
            <TextField
              name="description"
              label={t("Description")}
              multiline
              disabled={isDelete || isView}
            />
            <TextField
              name="stock"
              label={t("Stock")}
              disabled={isDelete || isView}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            {isDelete && (
              <Button
                type="submit"
                variant="contained"
                color="error"
                onClick={() => pathDelete(curProduct?.id as number)}
                sx={{ width: "100px" }}
              >
                {t("Delete")}
              </Button>
            )}
            {(isCreate || isEdit) && (
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100px", bgcolor: color.textLogo }}
              >
                {t("Save")}
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              left: "8px",
              top: "8px",
            }}
          >
            <IconButton onClick={pathMerchant}>
              <ArrowBackIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};
