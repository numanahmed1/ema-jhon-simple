import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Shop.css";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  document.title = "Shop Details";

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map((productKey) => {
      const product = fakeData.find((pd) => pd.key === productKey);
      product.quantity = savedCart[productKey];
      return product;
    });

    setCart(previousCart);
  }, []);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;

    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);

    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="box-container">
      <div className="product-container">
        {products.length === 0 && <p>Loading...</p>}
        {products.map((product) => (
          <Product
            showCartBtn={true}
            key={product.key}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="shop-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="review-btn">Review your Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
