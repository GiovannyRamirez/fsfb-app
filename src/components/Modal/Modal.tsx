import { Modal as MuiModal } from "@mui/material";

import "./styles.css";

interface IModalProps {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export const Modal = ({ open, onClose, children }: IModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <div className="modalContent">{children}</div>
    </MuiModal>
  );
};
