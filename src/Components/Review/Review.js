import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Review.css";
import happyImage from "../../images/giphy.gif";
import "./Review.css";
import { useHistory } from "react-router";

const Review = () => {
  document.title = "Review Page";
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("https://fierce-shore-04831.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const handleRemoveProduct = (productKey) => {
    console.log("clicked", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  const history = useHistory();
  const handleProceedCheckout = () => {
    history.push("/shipment");
  };

  return (
    <div className="box-container">
      <div className="product-container">
        {cart.map((product) => (
          <ReviewItem
            handleRemoveProduct={handleRemoveProduct}
            showCartBtn={true}
            key={product.key}
            product={product}
          ></ReviewItem>
        ))}
      </div>
      <div className="shop-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="review-btn">
            Proceed to checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
