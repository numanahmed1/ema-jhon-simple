import React from "react";
import { Link } from "react-router-dom";
import "./ReviewItem.css";

const ReviewItem = ({ product, handleRemoveProduct }) => {
  const { name, quantity, key, seller, img, price, stock } = product;
  return (
    <div className="product">
      <div className="product-left">
        <img src={img} alt="" />
      </div>
      <div className="product-right">
        <h4>
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <p>Quantity: {quantity}</p>
        <p>
          By:<strong> {seller}</strong>
        </p>
        <p>${price}</p>
        <p>only {stock} left in stock - order soon</p>

        <button onClick={() => handleRemoveProduct(key)} className="cart-btn">
          Remove to cart
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
