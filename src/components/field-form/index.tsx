import { TextField as TextFieldMUI } from "@mui/material";
import { makeField } from "./tool";
import { ImageEdit } from "./ImageEdit";

export const TextField = makeField(TextFieldMUI);
export const ImageField = makeField(ImageEdit);
