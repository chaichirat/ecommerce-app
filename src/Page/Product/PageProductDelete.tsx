import { useCallback } from "react";
import { Header } from "../../components/Header";
import { paths } from "../../constants/paths";
import { useRouter } from "../../router";
import { ProductForm } from "./components/ProductForm";
import type { IProductType } from "../../constants/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const PageProductDelete = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleted } = useMutation({
    mutationFn: async (deleteProduct: IProductType) => {
      queryClient.setQueryData(["product"], (productsList: IProductType[]) =>
        productsList?.filter((product) => product.id !== deleteProduct.id)
      );
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onSuccess: () => {
      router.push(paths.merchant);
    },
  });

  const onDelete = useCallback(
    (values: IProductType) => {
      console.log("Delete:", values);
      deleted(values);
    },
    [deleted]
  );

  return (
    <>
      <Header />
      <ProductForm onSubmit={onDelete} />
    </>
  );
};
