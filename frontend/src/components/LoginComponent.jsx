import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import toast from 'react-hot-toast';
import "../stylesheets/global.css"
import BASE_URL from "../config"

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function clickHandler() {
    try {
      const response = await fetch(`${BASE_URL}auth/logout`, {
        "credentials": "include",
        "method": "POST"
      });
      const data = await response.json();
      if (response.ok){
        navigate("/");
        toast.success("user logged out");
      }
      else
        toast.error(data.message);
    }
    catch (err) {
      toast.error("server error");
    }
  }

  async function submitHandler(e) {
    try {
      e.preventDefault();
      const response = await fetch(`${BASE_URL}`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({
          username, password
        }),
        "credentials": "include"
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        if (data.message === "no such user exists") {
          navigate("/signup");
        }
      }
      else {
        toast.success(`${data.data.username} logged in`);
        navigate("/auth/pokeball");
      }
      setUsername("");
      setPassword("");
    }
    catch (err) {
      toast.error("server error");
    }
  }

  return <>
    <form onSubmit={submitHandler} className="dynapuff">
      <h1>Login Form</h1>
      <label htmlFor="username">
        <input className="dynapuff" type="text" name="username" id="username" placeholder="enter your username" onChange={(e) => setUsername(e.target.value)} value={username} autoComplete="off" />
      </label>
      <label htmlFor="password">
        <input className="dynapuff" type="password" name="password" id="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="off" />
      </label>
      <button type="submit" className="dynapuff">Log in</button>
      <button type="button" onClick={clickHandler} className="dynapuff">Logout</button>
      <NavLink to="/signup">Create a Pokeball</NavLink>
      <NavLink to="/auth/pokeball">View your pokeball</NavLink>
    </form>
  </>
}

export default LoginComponent;