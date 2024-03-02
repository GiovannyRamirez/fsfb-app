import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";

import "./styles.css";

interface ILoaderProps {
  loading: boolean;
}

export const Loader = ({ loading }: ILoaderProps) => {
  return (
    <Modal open={loading} onClose={() => null}>
      <div className="loaderContainer">
        <CircularProgress size={120} />
      </div>
    </Modal>
  );
};
