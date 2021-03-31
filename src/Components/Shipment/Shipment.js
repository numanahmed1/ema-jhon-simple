import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  document.title = "Shipment Page";

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const saveCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: saveCart,
      shipment: data,
      orderPlaced: new Date(),
    };

    fetch("https://fierce-shore-04831.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert(
            `${
              loggedInUser.name || loggedInUser.email
            }, Your order successfully placed.`
          );
          processOrder();
        }
      });
  };

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="names"
        defaultValue={loggedInUser.name}
        ref={register({ required: true })}
        placeholder="Your Name"
      />
      {errors.names && <span className="error">Name is required</span>}
      <input
        name="email"
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder="Email"
      />
      {errors.email && <span className="error">Email is required</span>}
      <input
        name="address"
        ref={register({ required: true })}
        placeholder="Address"
      />
      {errors.address && <span className="error">Address is required</span>}
      <input
        name="zip"
        ref={register({ required: true })}
        placeholder="ZIP Code"
      />
      {errors.zip && <span className="error">Zip code is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
