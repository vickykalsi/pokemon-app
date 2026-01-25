import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../stylesheets/global.css"
import styles from "../stylesheets/Component.module.css";
import BASE_URL from "../config"

function AddRemoveComponent() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [newPokemon, setNewPokemon] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${BASE_URL}names`);
      if (response.ok) {
        const names = await response.json();
        setPokemonNames(names.names);
      }
    }
    getData();
  }, []
  )

  async function submitHandler(e) {
    try {
      e.preventDefault();
      const response = await fetch(`${BASE_URL}auth/add`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "credentials": "include",
        "body": JSON.stringify({ newPokemon })
      });
      const data = await response.json();
      if (response.ok) {
        setNewPokemon("");
        toast.success(data.message);
      }
      else
        toast.error(data.message);
    }
    catch (err) {
      toast.error("server error");
    }
  }

  async function buttonHandler() {
    try {
      const response = await fetch(`${BASE_URL}auth/logout`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "credentials": "include"
      });
      const data = await response.json();
      toast.success(data.message);
      navigate("/");
    }
    catch (err) {
      toast.error("server error");
    }
  }

  function changeHandler(e) {
    setNewPokemon(e.target.value);
    if (e.target.value.length === 0)
      return setSuggestions([]);
    setSuggestions(pokemonNames.filter(name => name.startsWith(e.target.value.toLowerCase())));
  }

  function selectHandler(suggestion) {
    setNewPokemon(suggestion);
    setSuggestions([]);
  }

  return <>
    <form className="dynapuff" onSubmit={submitHandler}>
      <label htmlFor="newPokemon">
        <input type="text" id="newPokemon" value={newPokemon} onChange={changeHandler} autoComplete="off" className="dynapuff" />
      </label>
      <button type="submit" className="dynapuff">Catch</button>
      <NavLink to="/auth/pokeball">View your pokeball</NavLink>
      <NavLink to="/">Home</NavLink>
      <button type="button" onClick={buttonHandler} className="dynapuff">Logout</button>
      {suggestions.length>0 &&
        <div className={styles["pokemon-list"]}>
          <ul>{suggestions.map(suggestion => <li key={suggestion} onClick={() => selectHandler(suggestion)}>{suggestion}</li>)}</ul>
        </div>
      }
    </form>
  </>
}

export default AddRemoveComponent;