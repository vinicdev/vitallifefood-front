import { Button } from "@mui/material";

interface ButtonComponentProps {
  text: string;
  type: "submit" | "button";
  variant: "contained" | "outlined" | "text";
  onClick?: () => void;
}

export default function ButtonComponent({
  text,
  type,
  variant,
  onClick,
}: ButtonComponentProps) {
  return (
    <Button
      variant={variant}
      className="btn-primary"
      onClick={onClick}
      type={type}
    >
      {text}
    </Button>
  );
}
