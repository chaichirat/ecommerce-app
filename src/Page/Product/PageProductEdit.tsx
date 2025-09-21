import { useCallback } from "react";
import { Header } from "../../components/Header";
import { paths } from "../../constants/paths";
import { useRouter } from "../../router";
import { ProductForm } from "./components/ProductForm";
import type { IProductType } from "../../constants/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const PageProductEdit = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updated } = useMutation({
    mutationFn: async (updateProduct: IProductType) => {
      queryClient.setQueryData(["product"], (productsList: IProductType[]) =>
        productsList?.map((product) =>
          product.id === updateProduct.id ? updateProduct : product
        )
      );
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onSuccess: () => {
      router.push(paths.merchant);
    },
  });

  const onUpdate = useCallback(
    (values: IProductType) => {
      console.log("Edit:", values);
      updated(values);
    },
    [updated]
  );

  return (
    <>
      <Header />
      <ProductForm onSubmit={onUpdate} />
    </>
  );
};
