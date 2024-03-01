import { Button as MuiButton } from "@mui/material";

interface IButtonProps {
  label: string;
  variant?: "outlined" | "contained";
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  label,
  variant = "outlined",
  disabled = false,
  onClick,
}: IButtonProps) => {
  return (
    <MuiButton variant={variant} disabled={disabled} onClick={onClick}>
      {label}
    </MuiButton>
  );
};
