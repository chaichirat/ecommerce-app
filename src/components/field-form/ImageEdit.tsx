import { Box, ButtonBase, Typography } from "@mui/material";
import { useCallback, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

type IImageEditProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ImageEdit = (props: IImageEditProps) => {
  const { value, onChange, ...resProps } = props;
  const { t } = useTranslation();

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // Read the file as a data URL
        const reader = new FileReader();
        reader.onload = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );
  return (
    <>
      <ButtonBase
        component="label"
        role={undefined}
        tabIndex={-1} // prevent label from tab focus
        sx={{
          borderRadius: "0.5rem",
          overflow: "hidden",
          "&:has(:focus-visible)": {
            outline: "2px solid",
            outlineOffset: "2px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flexShrink: 0,
            width: { xs: "300px", md: "430px" },
            height: { xs: "280px", md: "410px" },
            overflow: "hidden",
          }}
        >
          <img
            src={
              value
                ? value
                : "https://cdn.vectorstock.com/i/500p/33/47/no-photo-available-icon-vector-40343347.jpg"
            }
            style={{
              maxWidth: "430px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <input
            type="file"
            accept="image/*"
            {...resProps}
            style={{
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            }}
            onChange={handleAvatarChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: "0px",
            opacity: 0.5,
            bgcolor: "black",
            height: "30px",
            width: "100%",
          }}
        >
          <Typography variant="subtitle1" color="white">
            {t("Edit")}
          </Typography>
        </Box>
      </ButtonBase>
    </>
  );
};
