import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import "../stylesheets/global.css"
import styles from "../stylesheets/Component.module.css"
import BASE_URL from "../config"

function ListComponent() {
  const [username, setUsername] = useState("");
  const [pokeball, setPokeball] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${BASE_URL}auth/pokeball`, { "credentials": "include" });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message);
        setPokeball(data.data.pokemonsInPokeball);
        setUsername(data.data.username);
        setHasLoaded(true);
      }
      catch (err) {
        setHasError(true);
        toast.error("server error");
      }
    }
    getData();
  }, []);

  async function buttonHandler() {
    try {
      const response = await fetch(`${BASE_URL}logout`, {
        "credentials": "include",
        "method": "POST"
      });
      const data = await response.json();
      toast.success("user logged out");
      navigate("/");
    }
    catch (err) {
      toast.error("server error");
    }
  }

  async function doubleClickHandler(pokemon) {
    try {
      const response = await fetch(`${BASE_URL}auth/delete`, {
        "method": "DELETE",
        "headers": {
          "Content-Type": "application/json"
        },
        "credentials": "include",
        "body": JSON.stringify({ pokemon })
      });
      const data = await response.json();
      if (response.ok) {
        setPokeball(data.data.pokemonsInPokeball);
        toast.success(data.message);
      }
      else
        toast.error(data.message);
    }
    catch (err) {
      toast.error("server error");
    }
  }

  return <>
    <div className={`dynapuff ${styles["pokeball-page"]}`}>
      <h1>{hasError ? 'Your pokeball could not be displayed at the moment' : hasLoaded ? pokeball.length > 0 ? 'Here is your pokeball' : 'Your pokeball is empty' : `Your pokeball is loading...`}</h1>
      {hasError === false && pokeball.length > 0 &&
        <div className={styles["pokeball"]}>{pokeball.map((pokemon) => {
          return <div key={pokemon.name}>
            <img src={`${pokemon.image}`} alt="pokemon's front image" className={styles["pokemon-image"]} onDoubleClick={() => doubleClickHandler(pokemon.name)}></img>
          </div>
        })}
        </div>}
      <p>double tap to remove a pokemon from your pokeball</p>
      <p>Signed in as {username}</p>
      <NavLink to="/auth/addremove">Catch a new pokemon</NavLink>
      <NavLink to="/auth/edit">Edit username</NavLink>
      <NavLink to="/">Home</NavLink>
      <button type="button" onClick={buttonHandler}
        className="dynapuff">Logout</button>
    </div>
  </>
}

export default ListComponent;