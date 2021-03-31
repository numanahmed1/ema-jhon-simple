import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("https://fierce-shore-04831.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);

  document.title = "Product Details";
  return (
    <div style={{ width: "1200px", margin: "auto" }}>
      <h1>Details of this product</h1>
      <Product showCartBtn={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
