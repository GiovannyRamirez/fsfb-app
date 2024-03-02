/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { IProduct } from "../../interfaces";

import { getAllProducts } from "../../api/requests";
import { GET_ERROR, STATUS } from "../../constants";

import { ProductForm } from "../../components/ProductForm/ProductForm";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import { Modal } from "../../components/Modal/Modal";

import "./styles.css";

export const Products = () => {
  const initialProduct = {
    id_product: "",
    name: "",
    description: "",
    price: "",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | string>("");

  const [showModal, setShowModal] = useState(false);
  const [formContent, setFormContent] = useState<IProduct>(initialProduct);

  const [products, setProducts] = useState<IProduct[]>([]);

  const onEditProduct = async (product: IProduct) => {
    setShowModal(true);
    setFormContent(product);
  };

  const onAddProduct = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setFormContent(initialProduct);
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data, status } = await getAllProducts();

      if (status === STATUS.EMPTY) {
        setProducts([]);
      } else {
        setProducts(data.products);
      }
    } catch (err: any) {
      const errorMessage = GET_ERROR(err?.response?.data?.error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onCloseModalError = async () => {
    setError(false);
    await getProducts();
  };

  const onUpdateProducts = (productInfo: IProduct, type: string) => {
    if (type === "create") {
      setProducts([productInfo, ...products]);
    } else if (type === "update") {
      const newProducts = products.filter(
        (prd: IProduct) =>
          Number(prd.id_product) !== Number(productInfo.id_product)
      );
      setProducts([productInfo, ...newProducts]);
    }
    onCloseModal();
  };

  const onDeleteProduct = (id: number) => {
    const newProducts = products.filter(
      (prd: IProduct) => Number(prd.id_product) !== Number(id)
    );
    setProducts([...newProducts]);
    onCloseModal();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="productsPage">
      <Loader loading={loading} />
      <section className="productsHeader">
        <h3 className="productsTitle">Listado de tus productos</h3>
        <Button
          id="addProductButton"
          label="Agregar producto"
          onClick={onAddProduct}
        />
      </section>
      <section className="productsList">
        {loading ? (
          <div className="productsEmpty">
            <EmptyState
              message="Estamos procesando tu solicitud"
              showImg={false}
            />
          </div>
        ) : !products.length ? (
          <div className="productsEmpty">
            <EmptyState message="Aún no tienes productos, empieza añadiendo uno" />
          </div>
        ) : (
          products.map(({ id_product, name, description, price }: IProduct) => {
            return (
              <ProductCard
                key={id_product}
                id_product={id_product}
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
        <ProductForm
          {...formContent}
          updateProducts={onUpdateProducts}
          removeProduct={onDeleteProduct}
        />
      </Modal>

      <Modal open={Boolean(error)} onClose={onCloseModalError}>
        <h3 className="error">{error}</h3>
      </Modal>
    </div>
  );
};
