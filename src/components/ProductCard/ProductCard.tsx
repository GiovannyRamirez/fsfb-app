import { transformPrice } from "../../utils";

import { Button } from "../Button/Button";

import "./styles.css";

interface IProductCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  onButtonClick: () => void;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  onButtonClick,
}: IProductCardProps) => {
  const productPrice = transformPrice(price);

  return (
    <div className="productContainer">
      <section className="productMainInfo">
        <h3 className="productName">{name}</h3>
        <span className="productPrice">{productPrice}</span>
      </section>
      <span className="productDescription">{description}</span>
      <Button id={`editProduct-${id}`} label="Editar" onClick={onButtonClick} />
    </div>
  );
};
