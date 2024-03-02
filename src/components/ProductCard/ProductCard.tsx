import { IProduct } from "../../interfaces";

import { transformPrice } from "../../utils";

import { Button } from "../Button/Button";

import "./styles.css";

interface IProductCardProps extends IProduct {
  onButtonClick: () => void;
}

export const ProductCard = ({
  id_product: id,
  name,
  description,
  price,
  onButtonClick,
}: IProductCardProps) => {
  const productPrice = transformPrice(Number(price));

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
