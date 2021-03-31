import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Ema jhon Logo" />
      </Link>
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        {loggedInUser ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={() => setLoggedInUser({})}>Sign Out</button>
        )}
      </nav>
    </div>
  );
};

export default Header;
