import {
  Backdrop,
  Box,
  Button,
  IconButton,
  LinearProgress,
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
  const { data: products, isLoading } = useGetProductsQRY();

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="60%"
        >
          <LinearProgress
            sx={{
              width: "100%",
              mb: 2,
              "& .MuiLinearProgress-bar": {
                bgcolor: color.background,
              },
              bgcolor: "#ffb7c9ff",
            }}
          />
        </Box>
      </Backdrop>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1180px",
          m: { xs: "88px 0.5rem 0", md: "108px auto 0" },
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
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: { xs: "10px", sm: "14px" },
                      width: { xs: "40px", sm: "auto" },
                    }}
                  >
                    {t("tableHead.Number")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                      fontSize: { xs: "10px", sm: "14px" },
                    }}
                  >
                    {t("tableHead.Image")}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: { xs: "10px", sm: "14px" } }}
                  >
                    {t("tableHead.Title")}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: { xs: "10px", sm: "14px" } }}
                  >
                    {t("tableHead.Price")}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                      fontSize: { xs: "10px", sm: "14px" },
                    }}
                  >
                    {t("tableHead.Stock")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: { xs: "10px", sm: "14px" },
                      width: { xs: "40px", sm: "auto" },
                    }}
                  >
                    {t("tableHead.Action")}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products?.map((product: IProductType, index: number) => (
                  <TableRow
                    key={product.id}
                    sx={{ ":nth-child(odd)": { bgcolor: "#EDEDED" } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                      }}
                    >
                      <img
                        src={product.image}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                        }}
                        onClick={() => pathView(product.id)}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          alignItems: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          whiteSpace: "normal",
                          lineHeight: "1.5em",
                          maxHeight: "3em",
                          fontSize: { xs: "10px", sm: "14px" },
                        }}
                      >
                        {product.title}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontSize: { xs: "10px", sm: "14px" } }}
                    >
                      ฿{product.price?.toLocaleString()}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                        fontSize: { xs: "10px", sm: "14px" },
                      }}
                    >
                      {product.stock ? product.stock : t("Out of stock.")}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                      >
                        <Tooltip title={t("button.View")}>
                          <IconButton
                            onClick={() => pathView(product.id)}
                            sx={{ p: { xs: "4px", sm: "8px" } }}
                          >
                            <VisibilityIcon
                              sx={{ fontSize: { xs: "14px", sm: "22px" } }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t("button.Edit")}>
                          <IconButton
                            onClick={() => pathEdit(product.id)}
                            sx={{ p: { xs: "4px", sm: "8px" } }}
                          >
                            <EditIcon
                              sx={{ fontSize: { xs: "14px", sm: "22px" } }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t("button.Delete")}>
                          <IconButton
                            onClick={() => pathDelete(product.id)}
                            sx={{ p: { xs: "4px", sm: "8px" } }}
                          >
                            <DeleteIcon
                              sx={{ fontSize: { xs: "14px", sm: "22px" } }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
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
