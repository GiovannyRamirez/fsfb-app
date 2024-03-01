import { useForm } from "../../hooks/useForm";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import "./styles.css";

interface IProductFormProps {
  id_product?: string | number;
  name?: string;
  description?: string;
  price?: number;
}

export const ProductForm = ({
  id_product: id = "",
  name = "",
  description = "",
  price = 0,
}: IProductFormProps) => {
  const { form, productName, productDescription, productPrice, onChange } =
    useForm({
      productName: name,
      productDescription: description,
      productPrice: price,
    });

  const onSubmit = () => {
    console.log(form);
  };

  const buttonText = id ? "Editar" : "Añadir";

  return (
    <div className="productForm">
      <Input
        id="productNameInput"
        label="Nombre del producto"
        value={productName}
        onChange={({ target }) => onChange(target.value, "productName")}
      />
      <Input
        id="productDescriptionInput"
        label="Descripción"
        multiline
        value={productDescription}
        onChange={({ target }) => onChange(target.value, "productDescription")}
      />
      <Input
        id="productPriceInput"
        label="Precio"
        value={productPrice}
        onChange={({ target }) => onChange(target.value, "productPrice")}
      />
      <Button id="productButton" label={buttonText} onClick={onSubmit} />
      {id && (
        <Button
          id="deleteProductButton"
          buttonType="error"
          variant="contained"
          label="Eliminar"
          onClick={onSubmit}
        />
      )}
    </div>
  );
};
