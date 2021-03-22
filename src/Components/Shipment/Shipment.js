import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";

const Shipment = () => {
  document.title = "Shipment Page";

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

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
