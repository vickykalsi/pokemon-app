import express from "express";
import { checkUser, addUser, getPokemons, logoutUser, addPokemon, deletePokemon, editUsername } from "../controllers/pokemonControllers.js";

export const protectedRouter = express.Router(), publicRouter = express.Router();

publicRouter.post("/", checkUser);
publicRouter.post("/signup", addUser);
protectedRouter.get("/pokeball", getPokemons);
protectedRouter.post("/add", addPokemon);
protectedRouter.delete("/delete", deletePokemon);
protectedRouter.put("/edit", editUsername);
protectedRouter.post("/logout", logoutUser);