/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { IProduct } from "../../interfaces";

import { useForm } from "../../hooks/useForm";

import { ProductSchema } from "../../utils/formSchemas";
import { transformPrice } from "../../utils/index";

import { deleteProduct, postProduct, putProduct } from "../../api/requests";
import { GET_ERROR } from "../../constants";

import { WarningModal } from "../WarningModal/WarningModal";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";

import "./styles.css";

interface IProductFormProps extends IProduct {
  updateProducts: (prd: IProduct, type: string) => void;
  removeProduct: (id: number) => void;
}

export const ProductForm = ({
  id_product: id = "",
  name = "",
  description = "",
  price = "0",
  updateProducts,
  removeProduct,
}: IProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | string>("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const initialFormErrors = {
    name: "",
    description: "",
    price: "",
  };
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const { productName, productDescription, productPrice, onChange } = useForm({
    productName: name,
    productDescription: description,
    productPrice: price,
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const body = {
        name: productName,
        description: productDescription,
        price: productPrice,
      };

      const parsedPrice = transformPrice(Number(productPrice));

      const validation = ProductSchema.safeParse({
        ...body,
        price: parsedPrice,
      });
      if (!validation.success) {
        const formattedErrors = validation.error.format();

        return setFormErrors({
          name: formattedErrors.name?._errors[0] ?? "",
          description: formattedErrors.description?._errors[0] ?? "",
          price: formattedErrors.price?._errors[0] ?? "",
        });
      }
      setFormErrors(initialFormErrors);

      if (id) {
        const { data } = await putProduct(Number(id), body);
        updateProducts(data.productInfo, "update");
      } else {
        const { data } = await postProduct(body);
        updateProducts(data.productInfo, "create");
      }
    } catch (err: any) {
      const errorMessage = GET_ERROR(err?.response?.data?.error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteProduct = async (id: number) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      removeProduct(id);
    } catch (err: any) {
      const errorMessage = GET_ERROR(err?.response?.data?.error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const buttonText = id ? "Editar" : "Añadir";

  const isButtonDisabled = !productName || !productDescription || !productPrice;

  return (
    <div className="productForm">
      <Loader loading={loading} />
      <Input
        id="productNameInput"
        label="Nombre del producto"
        value={productName}
        error={formErrors.name}
        onChange={({ target }) => onChange(target.value, "productName")}
      />
      <Input
        id="productDescriptionInput"
        label="Descripción"
        multiline
        value={productDescription}
        error={formErrors.description}
        onChange={({ target }) => onChange(target.value, "productDescription")}
      />
      <Input
        id="productPriceInput"
        label="Precio"
        value={productPrice}
        error={formErrors.price}
        onChange={({ target }) => onChange(target.value, "productPrice")}
      />
      <Button
        disabled={isButtonDisabled}
        id="productButton"
        label={buttonText}
        onClick={onSubmit}
      />
      {id && (
        <Button
          id="deleteProductButton"
          buttonType="error"
          variant="contained"
          label="Eliminar"
          onClick={() => setConfirmDeletion(true)}
        />
      )}

      <Modal open={Boolean(error)} onClose={() => setError(false)}>
        <h3 className="error">{error}</h3>
      </Modal>

      <WarningModal
        open={confirmDeletion}
        message="¿Estás seguro de realizar esta acción?"
        confirmButtonText="Si, Eliminar"
        onConfirm={() => onDeleteProduct(Number(id))}
        cancelButtonText="Cancelar"
        onCancel={() => setConfirmDeletion(false)}
      />
    </div>
  );
};
