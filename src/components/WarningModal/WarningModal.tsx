import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";

import "./styles.css";

interface IWarningProps {
  open: boolean;
  message: string;
  cancelButtonText: string;
  confirmButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const WarningModal = ({
  open,
  message,
  confirmButtonText,
  onConfirm,
  cancelButtonText,
  onCancel,
}: IWarningProps) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <div className="warningModal">
        <h3 className="warningMessage">{message}</h3>
        <section className="warningButtons">
          <Button
            id="cancelButton"
            variant="contained"
            label={cancelButtonText}
            onClick={onCancel}
          />
          <Button
            id="confirmButton"
            buttonType="error"
            variant="contained"
            label={confirmButtonText}
            onClick={onConfirm}
          />
        </section>
      </div>
    </Modal>
  );
};
