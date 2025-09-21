import { Box, Typography } from "@mui/material";
import { useMemo, type ComponentType, useEffect, useState } from "react";
import {
  type FieldRenderProps,
  Field,
  type FieldProps,
} from "react-final-form";

export type Props<T> = {
  position?: "vertical" | "horizon" | "table";
} & FieldRenderProps<T>;

export const modifyComponent =
  (Component: ComponentType<any>, width = "100%") =>
  (props: Omit<Props<any>, "onBlur">) => {
    const {
      input,
      meta,
      onChange,
      onBlur,
      label,
      position = "horizon",
      // hideErrorLabel = false,
      dataDiff,
      nameDiff,
      title,
      required,
      dataTable,
      ...restProps
    } = props;

    const { error, touched, data } = meta;

    const iserror = useMemo(() => {
      return error && touched;
    }, [error, touched]);

    const [isDiff, setIsDiff] = useState<boolean>(false);
    const [setRowDiff] = useState<string[]>([]);

    useEffect(() => {
      if (dataDiff) {
        const splitName = input.name.split(".");
        let realName = splitName[0];
        if (splitName.length > 1) {
          realName = splitName[1];
        }

        if (position === "table") {
          const rowDiffTemp = dataDiff
            ?.filter(
              (x: string) => x.indexOf(nameDiff) > -1 && x.slice(-1) !== "s"
            )
            ?.map((x: string) => x.slice(-1));

          if (rowDiffTemp?.length > 0) {
            setIsDiff(true);
            setRowDiff(rowDiffTemp);
          }
        } else if (position === "tableAccount" && dataDiff.includes(realName)) {
          const rowDiffTemp = dataTable?.map((_: any, index: number) =>
            index.toString()
          );

          setIsDiff(true);
          setRowDiff(rowDiffTemp);
        } else if (dataDiff.includes(realName)) {
          setIsDiff(true);
        } else setIsDiff(false);
      }
    }, [input.name, dataDiff, position, nameDiff, dataTable, props]);

    const renderWithVertical = () => {
      return (
        <Box
          display="flex"
          gap="8px"
          flexDirection="column"
          width="100%"
          alignItems={"start"}
          textAlign={"start"}
          marginBottom={"4px"}
          id={isDiff ? "diff" : ""}
        >
          <Component
            {...input}
            label={label ?? ""}
            onChange={(v: any) => {
              input.onChange(v);
              onChange?.(v);
            }}
            onBlur={(v: any) => {
              onBlur?.(v);
              input.onBlur(v);
            }}
            error={iserror}
            iserror={iserror?.toString()} // แปลงเป็น string ก่อนส่ง
            meta={meta}
            data={data}
            isDiff={isDiff}
            {...restProps}
            style={{ width: "100%" }}
          />

          {iserror && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"start"}
              width="100%"
              sx={{ marginTont: "4px" }}
            >
              <Typography fontSize="14px" color="red">
                {error}
              </Typography>
            </Box>
          )}
        </Box>
      );
    };

    return renderWithVertical();
  };

type CustomFieldProps = {
  hideErrorLabel?: boolean;
};

// export const makeField = <T,>(component: ComponentType<any>, width?: string) => {
//   const newComponent = modifyComponent(component, width)
//   return (props: FieldProps<string, Props<string>> & T & CustomFieldProps) => <Field {...props} render={newComponent} />
// }

export const makeField = <T,>(
  component: ComponentType<any>,
  width?: string
) => {
  const newComponent = modifyComponent(component, width);
  return (props: FieldProps<string, Props<string>> & T & CustomFieldProps) => (
    <Field {...props} render={newComponent} />
  );
};
