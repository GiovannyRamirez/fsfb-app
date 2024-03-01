import { Button as MuiButton } from "@mui/material";

interface IButtonProps {
  id: string;
  label: string;
  variant?: "outlined" | "contained";
  buttonType?: "warning" | "error" | "primary";
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  id,
  label,
  variant = "outlined",
  disabled = false,
  onClick,
  buttonType = "primary",
}: IButtonProps) => {
  return (
    <MuiButton
      color={buttonType}
      id={id}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};
