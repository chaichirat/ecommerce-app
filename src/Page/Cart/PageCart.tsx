import { Box, Checkbox, Typography } from "@mui/material";

import { Header } from "../../components/Header";
import { type IProductType } from "../../constants/products";
import { ButtonCount } from "../../components/ButtonCount";
import {
  useCallback,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShopBox } from "./components/ShopBox";
import { color } from "../../constants/color";
import { useRouter } from "../../router";
import { paths } from "../../constants/paths";
import Swal from "sweetalert2";

export const useGetProductCartQRY = () => {
  return useQuery<IProductType[] | undefined>({
    queryKey: ["cart"],
    queryFn: () => [],
  });
};

export const PageCart = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: curCart = [] } = useGetProductCartQRY();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<readonly number[]>([]);

  const { mutate: deleted } = useMutation({
    mutationFn: async (deleted: IProductType) => {
      queryClient.setQueryData(["cart"], (productList: IProductType[]) =>
        productList.filter((product) => product.id !== deleted.id)
      );
    },
    onSuccess: () => {
      console.log("delete success.");
    },
  });

  const { mutate: addOrder } = useMutation({
    mutationFn: async (addOrders: IProductType[]) => {
      queryClient.removeQueries({ queryKey: ["order"] });

      queryClient.setQueryData(
        ["order"],
        (productsList: IProductType[] = []) => [...productsList, ...addOrders]
      );
    },
    onSuccess: () => {
      console.log("Add to Order success");
      router.push(paths.payment);
    },
  });

  // const { mutate: addAmount } = useMutation({
  //   mutationFn: async (amount: IProductType) => {
  //     queryClient.setQueryData(["cart"], (productList: IProductType[]) =>
  //       productList.map((product) =>
  //         product.id === amount.id ? { ...product, amount: amount } : product
  //       )
  //     );
  //   },
  //   onSuccess: () => {
  //     console.log("Add amount success.");
  //   },
  // });

  const onBuying = useCallback(() => {
    const selectedProducts = curCart.filter((product) =>
      selected.includes(product.id)
    );

    if (selectedProducts.length === 0) {
      console.log("Please select your product");
      return Swal.fire({
        icon: "warning",
        title: t("Please select your product"),
        confirmButtonText: t("button.OK"),
        confirmButtonColor: color.background,
      });
    }

    addOrder(selectedProducts);
  }, [router, addOrder, selected, curCart]);

  const onDelete = useCallback(
    (values: IProductType) => {
      deleted(values);
    },
    [deleted, curCart]
  );

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? curCart.map((p) => p.id) : []);
  };

  const handleSelectItem = (_: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];
    if (selectedIndex === -1) newSelected = newSelected.concat(selected, id);
    else if (selectedIndex === 0) newSelected = selected.slice(1);
    else if (selectedIndex === selected.length - 1)
      newSelected = selected.slice(0, -1);
    else
      newSelected = selected
        .slice(0, selectedIndex)
        .concat(selected.slice(selectedIndex + 1));
    setSelected(newSelected);
  };

  let total = 0;
  curCart
    .filter((p) => selected.includes(p.id))
    .forEach((product) => {
      total += (product.price ?? 0) * (product.amount ?? 1);
    });

  return (
    <>
      <Header />
      {curCart.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: "0 auto",
            height: "calc(100vh - 108px)",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <Box sx={{ maxWidth: "800px" }}>
              <img
                style={{ width: "100%", height: "auto" }}
                src="https://decproduct.com/images/web/empty-cart.png"
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxWidth: "1180px",
            m: { xs: "0 0.5rem", md: "0 auto" },
            boxSizing: "border-box",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "white",
              borderRadius: "0.5rem",
              p: "0.5rem",
              width: "100%",
              height: "auto",
              mt: "2rem",
              boxSizing: "border-box",
            }}
          >
            <Checkbox
              indeterminate={
                selected.length > 0 && selected.length < curCart.length
              }
              checked={selected.length === curCart.length}
              onChange={handleSelectAllClick}
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
              {t("tableHead.Products")}
            </Typography>
          </Box>

          {curCart.map((product) => {
            const isItemSelected = selected.includes(product.id);

            return (
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
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onClick={(event) => handleSelectItem(event, product.id)}
                  sx={{
                    "&.Mui-checked": {
                      color: color.background,
                    },
                  }}
                />

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
                      <Typography
                        onClick={() => onDelete(product)}
                        sx={{
                          display: { xs: "block", sm: "none" },
                          cursor: "pointer",
                          color: color.background,
                          fontSize: "12px",
                        }}
                      >
                        {t("button.Delete")}
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
                        variant="subtitle1"
                        sx={{
                          color: color.background,
                        }}
                      >
                        ฿{product.price?.toLocaleString()}
                      </Typography>
                      <ButtonCount
                        amount={
                          product.amount &&
                          product.stock &&
                          product.amount <= product.stock
                            ? product.amount
                            : (product.stock as number)
                        }
                        setAmount={(value) =>
                          queryClient.setQueryData<IProductType[]>(
                            ["cart"],
                            (productList = []) =>
                              productList.map((p) =>
                                p.id === product.id
                                  ? { ...p, amount: value }
                                  : p
                              )
                          )
                        }
                        stock={product.stock ?? 1}
                      />
                    </Box>
                  </Box>
                  <Typography
                    onClick={() => onDelete(product)}
                    sx={{
                      display: { xs: "none", sm: "block" },
                      position: { xs: "absolute", sm: "unset" },
                      top: "16px",
                      right: "16px",
                      cursor: "pointer",
                      "&:hover": { color: color.background },
                      fontSize: "16px",
                    }}
                  >
                    {t("button.Delete")}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          <ShopBox
            onBuying={onBuying}
            indeterminate={
              selected.length > 0 && selected.length < curCart.length
            }
            checked={selected.length === curCart.length}
            onChange={handleSelectAllClick}
            total={total}
          />
        </Box>
      )}
    </>
  );
};
