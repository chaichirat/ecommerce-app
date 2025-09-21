import { useCallback } from "react";
import { Form } from "react-final-form";
import { ProductFormDetail } from "./ProductFormDetail";
import type { IProductType } from "../../../constants/products";
import { useGetProductByIdQRY } from "../../Home/PageHome";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type IProductFormProps = {
  onSubmit: (values: IProductType) => void;
};

export const ProductForm = (props: IProductFormProps) => {
  const { onSubmit } = props;
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: curProduct } = useGetProductByIdQRY(Number(id));

  const onValidate = useCallback(
    (values: IProductType) => {
      const error: Partial<IProductType> = {};

      if (!values.image) {
        error.image = t("validation.Image is require.");
      }
      if (!values.title) {
        error.title = t("validation.Title is require.");
      }
      if (!values.description) {
        error.description = t("validation.Description is require.");
      }

      if (!values.price) {
        error.price = t("validation.Price is require.") as any;
      } else if (isNaN(values.price)) {
        error.price = t("validation.Please enter a number.") as any;
      }

      if (!values.stock) {
        error.stock = t("validation.Stock is require.") as any;
      } else if (isNaN(values.stock)) {
        error.stock = t("validation.Please enter a number.") as any;
      }

      return error;
    },
    [curProduct, t]
  );

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={onValidate}
        initialValues={curProduct}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ProductFormDetail />
          </form>
        )}
      </Form>
    </>
  );
};
