import { Box, Button, IconButton, Skeleton, Typography } from "@mui/material";
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
import { color } from "../../constants/color";
import { useGetCurUserQRY } from "../Login/components/LoginForm";
import Swal from "sweetalert2";

export const PageProduct = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: curProduct, isLoading } = useGetProductByIdQRY(Number(id));
  const { data: curUser } = useGetCurUserQRY();
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState(1);

  const { mutate: addOrder } = useMutation({
    mutationFn: async (addOrder: IProductType) => {
      if (addOrder?.stock) {
        queryClient.removeQueries({ queryKey: ["order"] });
        queryClient.setQueryData(
          ["order"],
          (productsList: IProductType[] = []) => [
            ...productsList,
            { ...addOrder, amount },
          ]
        );
      } else {
        Swal.fire({
          icon: "error",
          title: t("Sorry, this product is currently out of stock."),
          confirmButtonText: t("button.OK"),
          confirmButtonColor: color.background,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(paths.home);
          }
        });
      }

      return addOrder;
    },
    onSuccess: (values: IProductType) => {
      console.log("Add to Order: Success.");
      if (values.stock) {
        router.push(paths.payment);
      }
    },
  });

  const { mutate: addCart } = useMutation({
    mutationFn: async (addCart: IProductType) => {
      if (addCart?.stock) {
        queryClient.setQueryData(["cart"], (productsList: IProductType[]) => {
          const foundProductCart = productsList.find(
            (product) => product.id === addCart.id
          );

          if (foundProductCart) {
            return productsList.map((product) =>
              product.id === addCart.id
                ? {
                    ...product,
                    amount:
                      (product?.amount ?? 0) < (product?.stock ?? 0)
                        ? (product?.amount as number) + amount
                        : product?.stock,
                  }
                : product
            );
          } else {
            return [...productsList, { ...addCart, amount }];
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: t("Sorry, this product is currently out of stock."),
          confirmButtonText: t("button.OK"),
          confirmButtonColor: color.background,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(paths.home);
          }
        });
      }

      return addCart;
    },
    onSuccess: (values: IProductType) => {
      console.log("Add to Cart: Success.");
      if (values.stock) {
        Swal.fire({
          icon: "success",
          title: t("Add to cart completed"),
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1000,
        });
      }
    },
  });

  const onBuying = useCallback(() => {
    if (curUser) {
      if (!curProduct) return;
      console.log("Add to Order:", curProduct);
      addOrder(curProduct);
    } else {
      router.push(paths.login);
    }
  }, [curProduct, router, addOrder]);

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
          position: "relative",
          bgcolor: "white",
          m: { xs: "0 0.5rem", md: "0 auto" },
          mt: { xs: "16px", md: "48px" },
          p: { xs: "3rem 1rem ", sm: "2rem 3rem" },
          borderRadius: "0.5rem",
          boxSizing: "border-box",
          maxWidth: { xs: "100%", md: "1180px" },
          height: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "start",
            alignItems: { xs: "center", md: "unset" },
            gap: "2rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              borderRadius: "0.5rem",
              overflow: "hidden",
              flexShrink: 0,
              width: { xs: "300px", md: "430px" },
              height: { xs: "280px", md: "410px" },
            }}
          >
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            ) : (
              <a href={curProduct?.image} target="blank">
                <img
                  src={curProduct?.image}
                  style={{
                    maxWidth: "430px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </a>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4rem",
              textAlign: "start",
              boxSizing: "border-box",
              width: "100%",
              height: "100%",
            }}
          >
            {isLoading ? (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Skeleton variant="text" width="50%" height={40} />
                <Skeleton variant="text" width="30%" height={60} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Box>
            ) : (
              <>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    <b>{curProduct?.title}</b>
                  </Typography>
                  <b>
                    <Typography
                      variant="h3"
                      gutterBottom
                      color={color.background}
                    >
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
                      gap: { xs: "2rem", md: "4rem" },
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontSize: { xs: "14px", sm: "18px" } }}
                    >
                      <b>{t("tableHead.Amount")}:</b>
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: "1rem", sm: "2rem" },
                        width: "100%",
                      }}
                    >
                      <ButtonCount
                        amount={amount}
                        setAmount={setAmount}
                        stock={curProduct?.stock ?? 1}
                      />
                      <Typography
                        sx={{
                          width: "100%",
                          color: "gray",
                          fontSize: { xs: "14px", sm: "18px" },
                        }}
                      >
                        <b>{t("tableHead.Stock")}:</b>{" "}
                        {curProduct?.stock
                          ? curProduct?.stock
                          : t("Out of stock.")}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", sm: "start" },
                      gap: { xs: "0.5rem", sm: "1rem" },
                      width: "100%",
                      height: "40px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={onAddCart}
                      startIcon={<AddShoppingCartIcon fontSize="large" />}
                      sx={{
                        maxwidth: "160px",
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
                      sx={{
                        bgcolor: color.background,
                        width: "160px",
                      }}
                    >
                      {t("Shop")}
                    </Button>
                  </Box>
                </Box>
              </>
            )}
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
    </>
  );
};
