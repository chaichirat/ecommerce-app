import { Box, Button, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { color } from "../../constants/color";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { useGetCurUserQRY } from "../Login/components/LoginForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IProductType } from "../../constants/products";
import { useCallback } from "react";
import { useRouter } from "../../router";
import { paths } from "../../constants/paths";
import Swal from "sweetalert2";

const useGetOrderQRY = () => {
  return useQuery<IProductType[] | undefined>({
    queryKey: ["order"],
    queryFn: () => [],
  });
};

export const PagePayment = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: curUser } = useGetCurUserQRY();
  const { data: curOrder = [] } = useGetOrderQRY();
  const queryClient = useQueryClient();

  const { mutate: order } = useMutation({
    mutationFn: async (updateStock: IProductType[]) => {
      queryClient.setQueryData(["product"], (productsList: IProductType[]) =>
        productsList?.map((product) => {
          const ordered = updateStock.find((order) => order.id === product.id);
          if (ordered) {
            return {
              ...product,
              stock: (product?.stock ?? 0) - (ordered?.amount ?? 0),
            };
          }
          return product;
        })
      );
      queryClient.setQueryData(["cart"], (cartList: IProductType[]) =>
        cartList.filter(
          (product) => !updateStock.find((order) => order.id === product.id)
        )
      );
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: t("Order completed"),
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false,
        background: "#fff url(/images/trees.png)",
        backdrop: `rgba(0,0,123,0.4)
          url("https://media.tenor.com/rI_0O_9AJ5sAAAAj/nyan-cat-poptart-cat.gif")
          left top
          no-repeat`,
      }).then(() => router.push(paths.home));
    },
  });

  const onOrder = useCallback(() => {
    order(curOrder);
  }, [curOrder, order]);

  let total = 0;
  curOrder.forEach((product) => {
    total += (product.price ?? 0) * (product.amount ?? 1);
  });

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          maxWidth: "1180px",
          m: { xs: "0 0.5rem", lg: "0 auto" },
          boxSizing: "border-box",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            borderRadius: "0.5rem",
            gap: "1rem",
            p: { xs: "1rem", sm: "2rem" },
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
            <LocationPinIcon
              sx={{ fontSize: { xs: "18px", sm: "24px", lg: "26px" } }}
            />
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <b>{t("Shipping address")}</b>
            </Typography>

            <Typography
              sx={{
                display: { xs: "block", sm: "none" },
                color: "black",
                fontSize: "14px",
              }}
            >
              <b>
                {curUser?.username} {curUser?.phone}
              </b>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                <b>
                  {curUser?.username} {curUser?.phone}
                </b>
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                {curUser?.address.street}, {curUser?.address.city},{" "}
                {curUser?.address.state}, {curUser?.address.postalCode},{" "}
                {curUser?.address.country}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "18px" },
                  color: color.background,
                  cursor: "pointer",
                }}
              >
                {t("button.Edit")}
              </Typography>
            </Box>
          </Box>
        </Box>

        {curOrder?.map((product) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              bgcolor: "white",
              borderRadius: "0.5rem",
              p: "1rem 1rem",
              width: "100%",
              height: { xs: "auto", sm: "160px" },
              boxSizing: "border-box",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: { sm: "center" },
                gap: { xs: "0.5rem", sm: "2rem" },
                width: "100%",
              }}
            >
              <img
                src={product.image}
                style={{
                  width: "100px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "2rem",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      fontSize: { xs: "12px", sm: "18px" },
                    }}
                  >
                    {product.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "space-between", sm: "end" },
                    gap: { sm: "2rem" },
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: color.background,
                      fontSize: { xs: "12px", sm: "18px" },
                    }}
                  >
                    ฿{product.price?.toLocaleString()}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                    x{product.amount}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "auto",
            bgcolor: "white",
            borderRadius: "0.5rem",
            boxSizing: "border-box",
            p: "14px 16px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}
          >
            <b>{t("Total")}:</b>
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              width: "100%",
            }}
          >
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
                onClick={onOrder}
                sx={{
                  bgcolor: color.background,
                  width: "120px",
                }}
              >
                {t("Order")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
