export const transformPrice = (price: number) => {
  const copAmount = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumSignificantDigits: 7,
  }).format(price);

  return copAmount;
};
