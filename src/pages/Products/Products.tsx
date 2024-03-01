import { Button } from "../../components/Button/Button";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { ProductCard } from "../../components/ProductCard/ProductCard";

const products = [
  {
    id_product: 1,
    name: "Product Test with large name",
    description: "Product description updated again",
    price: 15,
  },
  {
    id_product: 2,
    name: "Product Test 2",
    description: "Product description",
    price: 15,
  },
  {
    id_product: 3,
    name: "Product Test 3",
    description: "Product description updated again",
    price: 12,
  },
];

interface IProduct {
  id_product: string | number;
  name: string;
  description: string;
  price: number;
}

import { useState } from "react";

import { ProductForm } from "../../components/ProductForm/ProductForm";
import { Modal } from "../../components/Modal/Modal";

import "./styles.css";

export const Products = () => {
  const initialProduct = {
    id_product: "",
    name: "",
    description: "",
    price: 0,
  };

  const [showModal, setShowModal] = useState(false);
  const [formContent, setFormContent] = useState<IProduct>(initialProduct);

  const onEditProduct = (product: IProduct) => {
    setShowModal(true);
    setFormContent(product);
  };

  const onAddProduct = () => setShowModal(true);

  const onCloseModal = () => {
    setShowModal(false);
    setFormContent(initialProduct);
  };

  return (
    <div className="productsPage">
      <section className="productsHeader">
        <h3 className="productsTitle">Listado de tus productos</h3>
        <Button
          id="addProductButton"
          label="Agregar producto"
          onClick={onAddProduct}
        />
      </section>
      <section className="productsList">
        {!products.length ? (
          <div className="productsEmpty">
            <EmptyState message="Aún no tienes productos, empieza añadiendo uno" />
          </div>
        ) : (
          products.map(({ id_product, name, description, price }: IProduct) => {
            return (
              <ProductCard
                key={id_product}
                id={id_product}
                name={name}
                description={description}
                price={price}
                onButtonClick={() =>
                  onEditProduct({ id_product, name, description, price })
                }
              />
            );
          })
        )}
      </section>

      <Modal open={showModal} onClose={onCloseModal}>
        <ProductForm {...formContent} />
      </Modal>
    </div>
  );
};
