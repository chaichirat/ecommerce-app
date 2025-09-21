import { useCallback } from "react";
import { Header } from "../../components/Header";
import { ProductForm } from "./components/ProductForm";

export const PageProductView = () => {
  const onView = useCallback(() => {}, []);

  return (
    <>
      <Header />
      <ProductForm onSubmit={onView} />
    </>
  );
};
