export const formatPrice = (val: number) =>
  new Intl.NumberFormat("es-CO", {
    maximumSignificantDigits: 7,
  }).format(val);

export const transformPrice = (price: number) => {
  const copAmount = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumSignificantDigits: 7,
  }).format(price);

  return copAmount;
};
