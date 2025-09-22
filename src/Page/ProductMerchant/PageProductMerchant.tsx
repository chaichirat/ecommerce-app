import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useGetProductsQRY } from "../Home/PageHome";
import type { IProductType } from "../../constants/products";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";
import { useRouter } from "../../router";
import { paths } from "../../constants/paths";
import { color } from "../../constants/color";
import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header";

export const PageProductMerchant = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: products } = useGetProductsQRY();

  const pathView = useCallback(
    (id: number) => router.push(paths.view.replace(":id", id.toString())),
    []
  );
  const pathEdit = useCallback(
    (id: number) => router.push(paths.edit.replace(":id", id.toString())),
    []
  );
  const pathDelete = useCallback(
    (id: number) => router.push(paths.delete.replace(":id", id.toString())),
    []
  );
  const pathCreate = useCallback(() => router.push(paths.create), []);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1180px",
          m: "0 auto",
          mt: "48px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mb: "2rem",
            boxSizing: "border-box",
          }}
        >
          <Box display="flex" justifyContent="end" width="100%" mb="1rem">
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              onClick={pathCreate}
              sx={{
                bgcolor: "white",
                color: color.background,
              }}
            >
              {t("button.New Product")}
            </Button>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "0.5rem",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("tableHead.Number")}</TableCell>
                  <TableCell align="center">{t("tableHead.Image")}</TableCell>
                  <TableCell align="left">{t("tableHead.Title")}</TableCell>
                  <TableCell align="left">{t("tableHead.Price")}</TableCell>
                  <TableCell align="left">{t("tableHead.Stock")}</TableCell>
                  <TableCell align="center">{t("tableHead.Action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product: IProductType, index: number) => (
                  <TableRow
                    key={product.id}
                    sx={{ ":nth-child(odd)": { bgcolor: "#EDEDED" } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">
                      <img
                        src={product.image}
                        style={{
                          width: "60px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                        }}
                        onClick={() => pathView(product.id)}
                      />
                    </TableCell>
                    <TableCell align="left">{product.title}</TableCell>
                    <TableCell align="left">
                      ฿{product.price?.toLocaleString()}
                    </TableCell>
                    <TableCell align="left">
                      {product.stock ? product.stock : t("Out of stock.")}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={t("button.View")}>
                        <IconButton onClick={() => pathView(product.id)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("button.Edit")}>
                        <IconButton onClick={() => pathEdit(product.id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("button.Delete")}>
                        <IconButton onClick={() => pathDelete(product.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};
