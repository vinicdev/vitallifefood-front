import { TextField } from "@mui/material";
import React from "react";

interface InputComponentProps {
  label: string;
  type: string;
  required?: boolean;
  onChange?: (value: string) => void;
  hasError?: boolean;
  value?: string;
}

export default function InputComponent({
  label,
  type,
  required,
  onChange,
  hasError,
  value,
}: InputComponentProps) {
  console.log(`Input ${label} - value:`, value);
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      {...(required && { required: true })}
      type={type}
      className="w-full"
      value={value || ""}
      onChange={(e) => {
        console.log("Input onChange:", e.target.value);
        onChange?.(e.target.value);
      }}
      InputLabelProps={{
        shrink: type === "date" ? true : undefined,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "var(--color-branco)",
          "& fieldset": {
            borderColor: hasError
              ? "var(--color-vermelho)"
              : "var(--color-verde)",
          },
          "&:hover fieldset": {
            borderColor: hasError
              ? "var(--color-vermelho)"
              : "var(--color-verde-claro)",
          },
          "&.Mui-focused fieldset": {
            borderColor: hasError
              ? "var(--color-vermelho)"
              : "var(--color-verde)",
          },
        },
        "& .MuiInputLabel-root": {
          color: hasError ? "var(--color-vermelho)" : "var(--color-marrom)",
          "&.Mui-focused": {
            color: hasError ? "var(--color-vermelho)" : "var(--color-verde)",
          },
        },
        "& .MuiInputBase-input": {
          color: "var(--color-marrom)",
        },
      }}
    />
  );
}
