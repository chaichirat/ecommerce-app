import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "../../components/Header";
import { products, type IProductType } from "../../constants/products";
import { useRouter } from "../../router";
import { useTranslation } from "react-i18next";
import { useCallback, useRef, useState, type RefObject } from "react";
import { paths } from "../../constants/paths";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Typography,
  Zoom,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { color } from "../../constants/color";
import * as motion from "motion/react-client";

export const useGetProductsQRY = () => {
  return useQuery({ queryKey: ["product"], queryFn: () => products });
};

export const useGetProductByIdQRY = (id: number) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      const data = queryClient.getQueryData<IProductType[]>(["product"]);
      return data?.find((product) => product.id === id);
    },
  });
};

export const PageHome = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: products } = useGetProductsQRY();
  const [visible, setVisible] = useState(false);

  const productList = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  () => window.removeEventListener("scroll", handleScroll);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pathProduct = useCallback(
    (id: number) => router.push(paths.product.replace(":id", id.toString())),
    [router]
  );

  return (
    <>
      <Header />
      <Box
        sx={{
          maxWidth: "1280px",
          width: "100%",
          m: "0px auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
            justifyContent: "start",
            height: { xs: "586px", sm: "668px", lg: "768px" },
            width: "100%",
            mt: "68px",
            position: "relative",
            boxSizing: "border-box",
            mb: "4rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              textAlign: { xs: "center", lg: "start" },
              maxwidth: "600px",
              height: "100%",
              mb: { xs: "0", lg: "10rem" },
              boxSizing: "border-box",
              color: "white",
              gap: "3rem",
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: { xs: "100%", lg: "560px" },
                  boxSizing: "border-box",
                }}
              >
                <Typography variant="h1">
                  <b>{t("home.Sunzada")}</b>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {t("home.SunzadaDetail1")}
                </Typography>
                <Typography variant="h5">
                  <b>{t("home.SunzadaDetail2")}</b>
                </Typography>
              </Box>
            </motion.div>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", lg: "start" },
                width: "100%",
              }}
            >
              <Button
                onClick={() => scrollToSection(productList)}
                variant="contained"
                sx={{
                  width: "180px",
                  bgcolor: "white",
                  color: color.background,
                }}
              >
                {t("button.Shop now")}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "block",
              position: { xs: "unset", lg: "absolute" },
              right: "-120px",
              top: "180px",
              width: { xs: "360px", sm: "600px", lg: "760px" },
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://www.pikpng.com/pngl/b/89-891664_electronics-png-electronics-product-png-clipart.png"
                style={{ width: "100%" }}
              />
            </motion.div>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h4" color="white">
            {t("home.Products just for you")}
          </Typography>
        </Box>

        <Box
          ref={productList}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(4, 1fr)",
              lg: "repeat(6, 1fr)",
            },
            p: { xs: "0.5rem", sm: "2rem" },
            borderRadius: "0.5rem",
            gap: { xs: "8px", sm: "12px" },
            width: "100%",
            maxWidth: "1180px",
            boxSizing: "border-box",
          }}
        >
          {products?.map((product) => (
            <Card
              key={product.id}
              sx={{
                width: "100%",
                maxWidth: "220px",
                mx: "auto",
                maxHeight: "330px",
                transition: "transform 0.15s ease-in-out",
                "&:hover": { transform: "scale(1.025)" },
              }}
            >
              <CardActionArea onClick={() => pathProduct(product.id)}>
                <CardMedia
                  component="img"
                  image={product.image}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "200px",
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "start",
                    height: "104px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      <b>{product.title}</b>
                    </Typography>
                    <Typography variant="h5" color={color.background}>
                      ฿{product.price?.toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    <b>{t("tableHead.Stock")}:</b>{" "}
                    {product.stock ? product.stock : t("Out of stock.")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Zoom in={visible}>
          <Fab
            size="small"
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              bottom: 90,
              right: { xs: 16, sm: 42 },
              bgcolor: "white",
              color: color.background,
              zIndex: 1000,
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>
      </Box>
    </>
  );
};
