import {
  Avatar,
  Badge,
  Box,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  styled,
  Tooltip,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "../router";
import { paths } from "../constants/paths";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useGetProductCartQRY } from "../Page/Cart/PageCart";
import { color } from "../constants/color";
import { useGetCurUserLoginQRY } from "../Page/Login/components/LoginForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  overflow: "hidden",
  marginLeft: 0,
  width: "400px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fe8513ff",
  "&:hover": { backgroundColor: "#eb7f1aff" },
  borderRadius: 0,
  right: 0,
  cursor: "pointer",
  zIndex: 10,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Header = () => {
  const router = useRouter();
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: curCart } = useGetProductCartQRY();
  const { data: curUser } = useGetCurUserLoginQRY();
  const queryClient = useQueryClient();

  const [lang, setLang] = useState(i18n.language);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const { mutate: userLogout } = useMutation({
    mutationFn: async () => {
      queryClient.removeQueries({ queryKey: ["curUser"] });
    },
    onSuccess: () => {
      router.push(paths.login);
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
  };

  const onClickCart = useCallback(() => {
    if (curUser) {
      router.push(paths.cart);
    } else {
      router.push(paths.login);
    }
  }, [router]);

  const onLogout = useCallback(() => {
    userLogout();
  }, []);

  const pathHome = useCallback(() => router.push(paths.home), [router]);
  const pathMerchant = useCallback(() => router.push(paths.merchant), [router]);

  const isHome = useMemo(() => {
    return router.pathname === paths.home;
  }, [router]);

  const isLogin = useMemo(() => {
    return router.pathname === paths.login;
  }, [router]);

  const isProduct = useMemo(() => {
    return router.pathname === `/product/${id}`;
  }, [router, id]);

  const isCart = useMemo(() => {
    return router.pathname === paths.cart;
  }, [router, id]);

  const isMerchant = useMemo(() => {
    return router.pathname === paths.merchant;
  }, [router, id]);

  const roleMerchant = useMemo(() => {
    return curUser?.role === "merchant";
  }, [router]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: isHome ? "fixed" : "",
          top: 0,
          left: 0,
          height: "68px",
          width: "100vw",
          bgcolor: "white",
          boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.38)",
          boxSizing: "border-box",
          overflow: "hidden",
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1180px",
            m: "0 auto",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "1000px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                transition: "transform 0.15s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={pathHome}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/048/973/352/non_2x/lazada-icon-logo-symbol-free-png.png"
                alt="Lazada-logo"
                style={{
                  width: "40px",
                  objectFit: "contain",
                }}
              />
              <Typography variant="h5" color={color.textLogo}>
                <b>Sunzada</b>
              </Typography>
            </Box>
            <Typography variant="h5" color={color.background}>
              {isCart
                ? "Cart"
                : isLogin
                ? "Login"
                : isMerchant
                ? "Manage Store"
                : ""}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {roleMerchant && (
              <Link to={paths.merchant} style={{ textDecoration: "none" }}>
                <b>
                  <Typography
                    variant="h6"
                    sx={{
                      color: color.textLogo,
                      transition: "color 0.15s ease-in-out",
                      "&:hover": { color: color.background },
                    }}
                  >
                    {t("header.Merchant")}
                  </Typography>
                </b>
              </Link>
            )}

            {isHome && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "white" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={t("header.Search")}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            )}

            {(isHome || isProduct) && (
              <Box>
                <IconButton onClick={onClickCart}>
                  <Tooltip title={t("header.Cart")}>
                    <Badge
                      badgeContent={curCart?.length}
                      sx={{
                        "& .MuiBadge-badge": {
                          bgcolor: color.background,
                          color: "white",
                        },
                      }}
                    >
                      <ShoppingCartOutlinedIcon
                        fontSize="large"
                        sx={{ color: color.textLogo }}
                      />
                    </Badge>
                  </Tooltip>
                </IconButton>
              </Box>
            )}

            <FormControl
              sx={{
                minWidth: 50,
              }}
            >
              <Select
                value={lang}
                disableUnderline
                onChange={handleChange}
                variant="standard"
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  color: color.textLogo,
                  transition: "color 0.15s ease-in-out",
                  "&:hover": { color: color.background },
                }}
              >
                <MenuItem
                  value={"en"}
                  onClick={() => i18n.changeLanguage("en")}
                >
                  EN
                </MenuItem>
                <MenuItem
                  value={"th"}
                  onClick={() => i18n.changeLanguage("th")}
                >
                  TH
                </MenuItem>
              </Select>
            </FormControl>

            {!isLogin &&
              (!curUser ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link
                    to={paths.login}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: color.textLogo,
                        transition: "color 0.15s ease-in-out",
                        "&:hover": { color: color.background },
                      }}
                    >
                      <b>Login</b>
                    </Typography>
                  </Link>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        src={curUser.image}
                        sx={{ width: 32, height: 32 }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar src={curUser?.image} /> Profile
              </MenuItem>
              {roleMerchant && (
                <MenuItem onClick={pathMerchant}>
                  <Avatar src={curUser?.image} /> My Store
                </MenuItem>
              )}
              <Divider />
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </>
  );
};
