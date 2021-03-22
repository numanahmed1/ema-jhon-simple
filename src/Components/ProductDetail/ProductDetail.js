import React from "react";
import { useParams } from "react-router";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const product = fakeData.find((pd) => pd.key === productKey);
  document.title = "Product Details";
  return (
    <div style={{ width: "1200px", margin: "auto" }}>
      <h1>Details of this product</h1>
      <Product showCartBtn={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
