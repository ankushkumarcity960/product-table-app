import { fetchProducts } from "./services/api";
import { useEffect, useState, useRef, useCallback } from "react";
import ProductTable from "./components/ProductTable";


function App() {

const [products, setProducts] = useState([]);
const [hasMore, setHasMore] = useState(true);
const [skip, setSkip] = useState(0);
const limit = 10;
const observer = useRef(null);

const loadProducts = useCallback(async () => {
  if (loading || !hasMore) return;

  setLoading(true);

  const newProducts = await fetchProducts(skip, limit);

  if (newProducts.length === 0) {
    setHasMore(false);
    setLoading(false);
    return;
  }

  setProducts((prev) => [...prev, ...newProducts]);

  setLoading(false);
}, [skip, loading, hasMore]);

useEffect(() => {
  loadProducts();
}, [loadProducts]);

const lastProductRef = (node) => {
  if (!hasMore) return;

  if (observer.current) observer.current.disconnect();

  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      setSkip((prev) => prev + limit);
    }
  });

  if (node) observer.current.observe(node);
};



const updateTitle = (id, newTitle) => {
  const updatedProducts = products.map((product) =>
    product.id === id
      ? { ...product, title: newTitle }
      : product
  );

  setProducts(updatedProducts);
};


  return (
   
<div className="app-container">
      <h1>Product Table App</h1>
    <ProductTable products={products} 
        updateTitle={updateTitle}
          lastProductRef={lastProductRef}


    />

    </div>
  );
}

export default App;
