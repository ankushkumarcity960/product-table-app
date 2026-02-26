



export const fetchProducts = async (skip, limit = 10) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  const data = await response.json();

  return data.products;
};