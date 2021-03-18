import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./loginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  // login with email
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
  };
  const handleChange = (event) => {
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordLength = event.target.value.length > 8;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordLength && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Google Sign in</button>
      )}
      <br />
      <br />
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={fbSignIn}>Facebook Sign in</button>
      )}
      {user.isSignedIn && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email Address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Login with Email</h1>

      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>

      <br />
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleChange}
            placeholder="Your Name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleChange}
          placeholder="Enter valid email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleChange}
          placeholder="Enter your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p> {user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          You successfully {newUser ? "created" : "logged in"} your account
        </p>
      )}
    </div>
  );
}

export default Login;
