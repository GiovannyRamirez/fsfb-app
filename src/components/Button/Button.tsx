import { Button as MuiButton } from "@mui/material";

interface IButtonProps {
  id: string;
  label: string;
  variant?: "outlined" | "contained";
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  id,
  label,
  variant = "outlined",
  disabled = false,
  onClick,
}: IButtonProps) => {
  return (
    <MuiButton id={id} variant={variant} disabled={disabled} onClick={onClick}>
      {label}
    </MuiButton>
  );
};
