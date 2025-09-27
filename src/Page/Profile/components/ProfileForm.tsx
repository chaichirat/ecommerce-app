import { useCallback } from "react";
import { Form } from "react-final-form";
import type { IUserType } from "../../../constants/user";
import { useTranslation } from "react-i18next";
import { ProfileFormDetail } from "./ProfileFormDetail";
import { useGetCurUserQRY } from "../../Login/components/LoginForm";

export const ProfileForm = () => {
  const { t } = useTranslation();
  const { data: curUser } = useGetCurUserQRY();

  const onValidate = useCallback(
    (values: IUserType) => {
      const error: Partial<IUserType> = {};

      if (!values.name) {
        error.name = t("Name is require.");
      }

      return error;
    },
    [t, curUser]
  );

  const onSubmit = () => useCallback(() => {}, []);

  return (
    <>
      <Form onSubmit={onSubmit} validate={onValidate} initialValues={curUser}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ProfileFormDetail />
          </form>
        )}
      </Form>
    </>
  );
};
