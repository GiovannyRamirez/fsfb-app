/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface IInputProps {
  id: string;
  label: string;
  type?: "password" | "text" | "email";
  value: string | number;
  multiline?: boolean;
  onChange: (e: any) => void;
}

export const Input = ({
  id,
  label,
  type = "text",
  value,
  multiline = false,
  onChange,
}: IInputProps) => {
  const isPasswordType = type === "password";
  const [showText, setShowText] = useState(false);

  const textType = isPasswordType ? (showText ? "text" : "password") : type;

  return (
    <TextField
      id={id}
      label={label}
      type={textType}
      value={value}
      multiline={multiline}
      onChange={onChange}
      InputProps={{
        endAdornment: isPasswordType && (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowText(!showText)}>
              {showText ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
