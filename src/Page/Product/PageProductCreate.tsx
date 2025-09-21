import { useCallback } from "react";
import { Header } from "../../components/Header";
import { paths } from "../../constants/paths";
import { useRouter } from "../../router";
import { ProductForm } from "./components/ProductForm";
import type { IProductType } from "../../constants/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const PageProductCreate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: create } = useMutation({
    mutationFn: async (create: IProductType) => {
      queryClient.setQueryData(["product"], (productsList: IProductType[]) => [
        ...productsList,
        { ...create, id: Date.now() },
      ]);
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onSuccess: () => {
      router.push(paths.merchant);
    },
  });

  const onUpdate = useCallback(
    (values: IProductType) => {
      console.log("Create:", values);
      create(values);
    },
    [create]
  );

  return (
    <>
      <Header />
      <ProductForm onSubmit={onUpdate} />
    </>
  );
};
