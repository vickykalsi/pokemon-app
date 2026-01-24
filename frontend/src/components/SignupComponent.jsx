import { useState } from "react";
import toast from "react-hot-toast"
import { useNavigate,NavLink } from "react-router-dom"
import "../stylesheets/global.css"
import BASE_URL from "../config"

function SignupComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}signup`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/");
        toast.success("now use your credentials to login at login page");
      }
      else
        toast.error(data.message);
      setUsername("");
      setPassword("");
    }
    catch (err) {
      toast.error("server error");
    }
  }

  return <>
    <form onSubmit={submitHandler} className="dynapuff">
      <h1>Signup Form</h1>
      <label htmlFor="username">
        <input className="dynapuff" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
      </label>
      <label htmlFor="password">
        <input className="dynapuff" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
      </label>
      <button type="submit" className="dynapuff">Create a Pokeball</button>
      <NavLink to="/">Home</NavLink>
    </form>
  </>
}

export default SignupComponent;