import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

type Order = "asc" | "desc";

export const useGetProductCartQRY = () => {
  return useQuery<IProductType[]>({ queryKey: ["cart"], queryFn: () => [] });
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof IProductType>(
  order: Order,
  orderBy: Key
): (a: IProductType, b: IProductType) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const PageCart = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: curCart = [] } = useGetProductCartQRY();
  const queryClient = useQueryClient();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IProductType>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [amounts, setAmounts] = useState<Record<number, number>>({});

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

  const onBuying = useCallback(() => {
    const selectedProducts = curCart.filter((p) => selected.includes(p.id));

    if (selectedProducts.length === 0) {
      console.log("No products selected");
      return alert("No products selected");
    }

    addOrder(selectedProducts);
  }, [router, addOrder, selected, curCart]);

  const onDelete = useCallback(
    (values: IProductType) => {
      deleted(values);
    },
    [deleted]
  );

  const handleRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof IProductType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const visibleRows = [...curCart].sort(getComparator(order, orderBy));

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          m: "0 auto",
          maxWidth: "1180px",
          width: "100%",
          mt: "48px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "0.5rem",
            mb: "2rem",
            width: "100%",
          }}
        >
          <Table sx={{ width: 1180 }}>
            <TableHead sx={{ width: "100%" }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < curCart.length
                    }
                    checked={selected.length === curCart.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>{t("tableHead.Products")}</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "title")}
                  >
                    {t("tableHead.Title")}
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" width="80px">
                  <TableSortLabel
                    active={orderBy === "price"}
                    direction={orderBy === "price" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "price")}
                  >
                    {t("tableHead.Price")}
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" width="100px">
                  {t("tableHead.Amount")}
                </TableCell>
                <TableCell align="center" width="100px">
                  {t("tableHead.Total")}
                </TableCell>
                <TableCell align="center" width="80px">
                  {t("tableHead.Action")}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.id);
                const amount = amounts[row.id] || 1;

                return (
                  <TableRow hover key={row.id} selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleSelectItem(event, row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={row.image}
                        style={{
                          width: "120px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell align="left">
                      ฿{row.price?.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonCount
                        amount={amount}
                        setAmount={(value) =>
                          setAmounts((prev) => ({ ...prev, [row.id]: value }))
                        }
                        stock={row.stock ?? 1}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ color: color.background }}>
                      ฿{row.price ? (row.price * amount).toLocaleString() : 0}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={t("button.Delete")}>
                        <IconButton onClick={() => onDelete(row)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <ShopBox onClick={onBuying} />
      </Box>
    </>
  );
};
