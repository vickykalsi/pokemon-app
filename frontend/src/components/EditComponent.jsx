import { useState } from "react";
import toast from "react-hot-toast"
import { NavLink } from "react-router-dom";
import "../stylesheets/global.css"
import BASE_URL from "../config"

function EditComponent() {
  const [username, setUsername] = useState("");

  async function submitHandler(e) {
    try {

      e.preventDefault();
      const response = await fetch(`${BASE_URL}auth/edit`, {
        "method": "PUT",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({ username }),
        "credentials": "include"
      });
      const data = await response.json();
      if (response.ok) 
        toast.success(`${data.message}`);
      else
        toast.error(data.message);
      setUsername("");
    }
    catch (err) {
      toast.error("server error");
    }
  }

  return <>
    <form onSubmit={submitHandler} className="dynapuff">
      <label htmlFor="username">
        <input className="dynapuff" type="text" name="username" id="username" placeholder="enter a new username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
      </label>
      <button type="submit" className="dynapuff">Change your Username</button>
      <NavLink to="/auth/pokeball">View your Pokeball</NavLink>
    </form>
  </>
}

export default EditComponent;