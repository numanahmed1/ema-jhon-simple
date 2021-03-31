import React from "react";

const Inventory = () => {
  document.title = "Inventory Page";
  const product = {};
  const handleAddProduct = () => [
    fetch("https://fierce-shore-04831.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    }),
  ];

  return (
    <div>
      <form action="">
        <p>
          <span>Name</span>
          <input type="text" />
        </p>
        <p>
          <span>Price: </span>
          <input type="text" />
        </p>
        <p>
          <span>Quantity: </span>
          <input type="text" />
        </p>
        <p>
          <span>Product Image: </span>
          <input type="file" />
        </p>
        <button type="submit" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Inventory;
