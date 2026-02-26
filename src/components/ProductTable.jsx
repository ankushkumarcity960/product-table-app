import React from "react";
import "../styles/table.css";

function ProductTable({ products, updateTitle, lastProductRef }) {

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Title</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price (₹)</th>
          <th>Rating</th>
        </tr>
      </thead>

      <tbody>
        {products.map((item, index) => {
          return (
            <tr
              key={item.id}
              ref={
              index === products.length - 1
              ? lastProductRef
               : null
               }
           >
<td>
  <input
    value={item.title}
    onChange={(e) =>
      updateTitle(item.id, e.target.value)
    }
  />
</td>             
              <td>{item.brand ? item.brand : "N/A"}</td>  

              <td>{item.category}</td>
              
              <td>{item.price}</td>
              
              <td>{item.rating}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;