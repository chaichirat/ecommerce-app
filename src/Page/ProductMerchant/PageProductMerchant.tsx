import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useCallback, useState, type MouseEvent } from "react";
import { useRouter } from "../../router";
import { paths } from "../../constants/paths";
import { color } from "../../constants/color";
import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header";

export const PageProductMerchant = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: products } = useGetProductsQRY();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

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
          m: { xs: "0 0.5rem", md: "0 auto" },
          mt: { xs: "24px", md: "48px" },
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
                          height: "40px",
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
                      <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
                      </Box>

                      <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton onClick={handleMenuOpen}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleMenuClose}
                          aria-labelledby="demo-positioned-button"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <MenuItem
                            onClick={() => pathView(product.id)}
                            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                          >
                            {t("button.View")}
                          </MenuItem>
                          <MenuItem
                            onClick={() => pathEdit(product.id)}
                            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                          >
                            {t("button.Edit")}
                          </MenuItem>
                          <MenuItem
                            onClick={() => pathDelete(product.id)}
                            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                          >
                            {t("button.Delete")}
                          </MenuItem>
                        </Menu>
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
