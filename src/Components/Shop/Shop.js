import React, { useState } from "react";
import "./Shop.css";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>
      <div className="shop-cart">
        <h4>This is cart</h4>
      </div>
    </div>
  );
};

export default Shop;