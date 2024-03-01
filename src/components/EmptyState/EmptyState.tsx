import emptyImg from "../../assets/img/empty.jpg";

import "./styles.css";

interface IEmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: IEmptyStateProps) => {
  return (
    <div className="emptyStateContainer">
      <h3 className="emptytateMessage">{message}</h3>
      <img className="emptyStateImg" src={emptyImg} alt="Empty Image" />
    </div>
  );
};
