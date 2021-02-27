import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product }) => {
  const { name, img, seller, price, stock } = product;
  console.log(product);
  return (
    <div className="product">
      <div className="product-left">
        <img src={img} alt="" />
      </div>
      <div className="product-right">
        <h4>{name}</h4>
        <p>
          By:<strong> {seller}</strong>
        </p>
        <p>${price}</p>
        <p>only {stock} left in stock - order soon</p>
        <button className="cart-btn">
          <FontAwesomeIcon className="icon" icon={faShoppingCart} /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
