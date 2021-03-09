import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = ({ product, handleAddProduct, showCartBtn }) => {
  const { name, img, seller, price, stock, key } = product;
  return (
    <div className="product">
      <div className="product-left">
        <img src={img} alt="" />
      </div>
      <div className="product-right">
        <h4>
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <p>
          By:<strong> {seller}</strong>
        </p>
        <p>${price}</p>
        <p>only {stock} left in stock - order soon</p>
        {showCartBtn && (
          <button
            onClick={() => handleAddProduct(product)}
            className="cart-btn"
          >
            <FontAwesomeIcon className="icon" icon={faShoppingCart} /> Add to
            cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
