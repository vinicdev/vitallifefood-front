"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

interface SelectComponentProps {
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  onChange?: (value: string) => void;
  hasError?: boolean;
}

export default function SelectComponent({
  label,
  options,
  required,
  onChange,
  hasError,
}: SelectComponentProps) {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id={`${label}-select-label`}
        sx={{
          color: hasError ? "var(--color-vermelho)" : "var(--color-marrom)",
          "&.Mui-focused": {
            color: hasError ? "var(--color-vermelho)" : "var(--color-verde)",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        onChange={handleChange}
        {...(required && { required: true })}
        sx={{
          backgroundColor: "var(--color-branco)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: hasError
              ? "var(--color-vermelho)"
              : "var(--color-verde)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: hasError
              ? "var(--color-vermelho)"
              : "var(--color-verde-claro)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: hasError
              ? "var(--color-vermelho)"
              : "var(--color-verde)",
          },
          "& .MuiSelect-icon": {
            color: hasError ? "var(--color-vermelho)" : "var(--color-marrom)",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
