import { useLocation, useNavigate, useParams, useRoutes } from "react-router";
import queryString from "query-string";
import { paths } from "../constants/paths";
import { useMemo } from "react";
import { PageProduct } from "../Page/Product/PageProduct";
import { PageHome } from "../Page/Home/PageHome";
import { PageProductEdit } from "../Page/Product/PageProductEdit";
import { PageProductDelete } from "../Page/Product/PageProductDelete";
import { PageProductCreate } from "../Page/Product/PageProductCreate";
import { PageProductMerchant } from "../Page/ProductMerchant/PageProductMerchant";
import { PageProductView } from "../Page/Product/PageProductView";
import { PageCart } from "../Page/Cart/PageCart";
import { PageLogin } from "../Page/Login/PageLogin";
import { PagePayment } from "../Page/Payment/PagePayment";
import { PageProfile } from "../Page/Profile/PageProfile";
import { PageEditProfile } from "../Page/Profile/PageEditProfile";

export const Router = () => {
  return useRoutes([
    {
      path: paths.home,
      element: <PageHome />,
    },
    {
      path: paths.login,
      element: <PageLogin />,
    },
    {
      path: paths.product,
      element: <PageProduct />,
    },
    {
      path: paths.edit,
      element: <PageProductEdit />,
    },
    {
      path: paths.delete,
      element: <PageProductDelete />,
    },
    {
      path: paths.create,
      element: <PageProductCreate />,
    },
    {
      path: paths.view,
      element: <PageProductView />,
    },
    {
      path: paths.merchant,
      element: <PageProductMerchant />,
    },
    {
      path: paths.cart,
      element: <PageCart />,
    },
    {
      path: paths.payment,
      element: <PagePayment />,
    },
    {
      path: paths.profile,
      element: <PageProfile />,
    },
    {
      path: paths.profileEdit,
      element: <PageEditProfile />,
    },
  ]);
};

export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(
    () => ({
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search.slice(1)),
        ...params,
      },
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string, options?: any) => navigate(href, options),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [navigate, location.search, params]
  );
}
