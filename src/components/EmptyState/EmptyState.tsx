import emptyImg from "../../assets/img/empty.jpg";

import "./styles.css";

interface IEmptyStateProps {
  message: string;
  showImg?: boolean;
}

export const EmptyState = ({ message, showImg = true }: IEmptyStateProps) => {
  return (
    <div className="emptyStateContainer">
      <h3 className="emptytateMessage">{message}</h3>
      {showImg && (
        <img className="emptyStateImg" src={emptyImg} alt="Empty Image" />
      )}
    </div>
  );
};
