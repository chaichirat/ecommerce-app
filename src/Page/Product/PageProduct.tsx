import { Box, Button, IconButton, Typography } from "@mui/material";
import { Header } from "../../components/Header";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "../../router";
import { useCallback, useState } from "react";
import { paths } from "../../constants/paths";
import { useParams } from "react-router-dom";
import { useGetProductByIdQRY } from "../Home/PageHome";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IProductType } from "../../constants/products";
import { ButtonCount } from "../../components/ButtonCount";
import { SnackBars } from "../../components/SnackBars";
import { color } from "../../constants/color";
import { useGetCurUserLoginQRY } from "../Login/components/LoginForm";

export const PageProduct = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: curProduct } = useGetProductByIdQRY(Number(id));
  const { data: curUser } = useGetCurUserLoginQRY();
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState(1);
  const [openSnackbars, setOpenSnackbars] = useState(false);
  const [buying, setBuying] = useState(false);
  const [label, setLabel] = useState("");

  const { mutate: stock } = useMutation({
    mutationFn: async (updateStock: IProductType) => {
      queryClient.setQueryData(["product"], (productsList: IProductType[]) =>
        productsList?.map((product) =>
          product.id === updateStock.id
            ? {
                ...updateStock,
                stock: updateStock?.stock
                  ? updateStock?.stock - amount
                  : alert(
                      `${t("Sorry, this product is currently out of stock.")}`
                    ),
              }
            : product
        )
      );
      queryClient.invalidateQueries({ queryKey: ["product"] });

      return updateStock;
    },
    onSuccess: (values: IProductType) => {
      if (values.stock) {
        setLabel("Shopping completed");
        setOpenSnackbars(true);
        setTimeout(() => {
          router.push(paths.home);
        }, 1000);
      } else {
        router.push(paths.home);
      }
    },
  });

  const { mutate: addCart } = useMutation({
    mutationFn: async (addCart: IProductType) => {
      if (addCart?.stock) {
        queryClient.setQueryData(
          ["cart"],
          (productsList: IProductType[] = []) => [...productsList, addCart]
        );
      } else {
        alert(`${t("Sorry, this product is currently out of stock.")}`);
      }

      return addCart;
    },
    onSuccess: (values: IProductType) => {
      console.log("Add to Cart: Success.");
      if (values.stock) {
        setLabel("Add to cart completed");
        setOpenSnackbars(true);
      } else {
        router.push(paths.home);
      }
    },
  });

  const onBuying = useCallback(() => {
    if (curUser) {
      if (!curProduct) return;
      console.log("Buy:", curProduct);
      setBuying(true);
      stock(curProduct);
    } else {
      router.push(paths.login);
    }
  }, [stock, curProduct, router]);

  const onAddCart = useCallback(() => {
    if (curUser) {
      if (!curProduct) return;
      console.log("Add to Cart:", curProduct);
      addCart(curProduct);
    } else {
      router.push(paths.login);
    }
  }, [addCart, curProduct, router]);

  const pathHome = useCallback(() => router.push(paths.home), [router]);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          bgcolor: "white",
          m: "0 auto",
          mt: "48px",
          p: "2rem 3rem",
          borderRadius: "0.5rem",
          maxWidth: "1180px",
        }}
      >
        <Box sx={{ display: "flex", gap: "2rem", width: "100%" }}>
          <Box
            sx={{
              borderRadius: "0.5rem",
              overflow: "hidden",
              width: "470px",
              height: "450px",
              flexShrink: 0,
            }}
          >
            <a href={curProduct?.image} target="blank">
              <img
                src={curProduct?.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </a>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "start",
              width: "100%",
            }}
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                <b>{curProduct?.title}</b>
              </Typography>
              <b>
                <Typography variant="h3" gutterBottom color={color.background}>
                  ฿{curProduct?.price?.toLocaleString()}
                </Typography>
              </b>
              <Typography variant="h6" gutterBottom>
                {curProduct?.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  gap: "4rem",
                  width: "100%",
                }}
              >
                <Typography variant="h6">
                  <b>{t("tableHead.Amount")}:</b>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "2rem",
                    width: "100%",
                  }}
                >
                  <ButtonCount
                    amount={amount}
                    setAmount={setAmount}
                    stock={curProduct?.stock ?? 1}
                  />
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", color: "gray" }}
                  >
                    <b>{t("tableHead.Stock")}:</b>
                    {curProduct?.stock ? curProduct?.stock : t("Out of stock.")}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  gap: "1rem",
                  width: "100%",
                  height: "40px",
                }}
              >
                <Button
                  variant="outlined"
                  disabled={buying}
                  onClick={onAddCart}
                  startIcon={<AddShoppingCartIcon fontSize="large" />}
                  sx={{
                    width: "160px",
                    borderColor: color.background,
                    bgcolor: "white",
                    color: color.background,
                  }}
                >
                  {t("button.Add to cart")}
                </Button>
                <Button
                  variant="contained"
                  onClick={onBuying}
                  disabled={buying}
                  sx={{
                    bgcolor: color.background,
                    width: "160px",
                  }}
                >
                  {t("button.Buy")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            right: "8px",
            top: "8px",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            left: "8px",
            top: "8px",
          }}
        >
          <IconButton onClick={pathHome}>
            <ArrowBackIosIcon />
          </IconButton>
        </Box>
      </Box>

      <SnackBars
        open={openSnackbars}
        setOpen={setOpenSnackbars}
        label={t(label)}
      />
    </>
  );
};
