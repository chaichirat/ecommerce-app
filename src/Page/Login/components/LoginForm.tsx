import { useCallback } from "react";
import { Form } from "react-final-form";
import { LoginFormDetail } from "./LoginFormDetail";
import { users, type IUserType } from "../../../constants/user";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "../../../router";
import { paths } from "../../../constants/paths";

const useGetUserLoginQRY = () => {
  return useQuery<IUserType[]>({
    queryKey: ["userLogin"],
    queryFn: () => users,
  });
};

export const useGetCurUserQRY = () => {
  return useQuery<IUserType | undefined>({
    queryKey: ["curUser"],
    queryFn: () => {
      const user = localStorage.getItem("curUser");
      if (!user) return undefined;
      return JSON.parse(user) as IUserType;
    },
    initialData: () => {
      const user = localStorage.getItem("curUser");
      if (!user) return undefined;
      return JSON.parse(user) as IUserType;
    },
  });
};

const useUserLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (curUser: IUserType) => {
      return {
        ...curUser,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
      };
    },
    onSuccess: (values: IUserType) => {
      queryClient.setQueryData<IUserType>(["curUser"], values);
      localStorage.setItem("curUser", JSON.stringify(values));
    },
  });
};

export const LoginForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data } = useGetUserLoginQRY();
  const { mutate: curUser } = useUserLogin();

  const onValidate = useCallback(
    (values: IUserType) => {
      const error: Partial<IUserType> = {};

      const foundUser = data?.find((user) => user.username === values.username);

      if (!values.username) {
        error.username = t("validation.Username is require");
      }
      if (values.username) {
        if (!foundUser) {
          error.username = t("validation.Username Ivalidate");
        }
      }
      if (foundUser) {
        if (!values.password) {
          error.password = t("validation.Password is require");
        } else if (values.password !== foundUser.password) {
          error.password = t("validation.Password Ivalidate");
        }
      }

      return error;
    },
    [t, data]
  );

  const onSubmit = useCallback(
    (values: IUserType) => {
      const foundUser = data?.find((user) => user.username === values.username);

      if (foundUser) {
        curUser(foundUser, {
          onSuccess: () => {
            router.push(paths.home);
          },
        });
      }
    },
    [router, data, curUser]
  );

  return (
    <>
      <Form onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <LoginFormDetail />
          </form>
        )}
      </Form>
    </>
  );
};
