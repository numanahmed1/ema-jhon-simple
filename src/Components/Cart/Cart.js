import React from "react";

import "./Cart.css";

const Cart = ({ cart, children }) => {
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };
  const total = cart.reduce(
    (total, prd) => total + prd.price * prd.quantity,
    0
  );

  const totalPrice = formatNumber(total);
  //   let totalPrice = 0;
  //   for (let i = 0; i < cart.length; i++) {
  //     const product = cart[i];
  //     totalPrice = totalPrice + product.price;
  //   }

  let shippingCost = 0;
  if (totalPrice > 50) {
    shippingCost = 0;
  } else if (totalPrice > 20) {
    shippingCost = 4.99;
  } else if (totalPrice > 0) {
    shippingCost = 12.99;
  }

  const tax = formatNumber(totalPrice / 10);
  const grandTotal = formatNumber(totalPrice + shippingCost + tax);
  return (
    <div className="cart-main">
      <h3>Order Summery</h3>
      <h4>Items Ordered: {cart.length}</h4>
      <h5>Items Price: {totalPrice}</h5>
      <h5>Shipping Cost: {shippingCost}</h5>
      <h5>Tax + Vat: {tax}</h5>
      <h5>Total Price: ${grandTotal}</h5>
      {children}
    </div>
  );
};

export default Cart;
