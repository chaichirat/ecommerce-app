import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCallback } from "react";

type IButtonCountProps = {
  amount: number;
  setAmount: (value: number) => void;
  stock: number;
};

export const ButtonCount = (props: IButtonCountProps) => {
  const { amount, setAmount, stock } = props;

  const onIncrease = useCallback(() => {
    if (amount < stock) {
      setAmount(amount + 1);
    }
  }, [amount, stock]);

  const onDecrease = useCallback(() => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }, [amount]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid gray",
          borderRadius: "0.25rem",
          height: "32px",
          width: "124px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRight: "1px solid gray",
            height: "100%",
          }}
        >
          <IconButton
            onClick={onDecrease}
            disableTouchRipple
            sx={{
              borderRadius: 0,
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "50px" }}>
          {amount}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderLeft: "1px solid gray",
            height: "100%",
          }}
        >
          <IconButton
            onClick={onIncrease}
            disableTouchRipple
            sx={{
              borderRadius: 0,
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
