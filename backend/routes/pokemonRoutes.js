import express from "express";
import { checkUser, addUser, getPokemons, logoutUser, addPokemon, deletePokemon, editUsername } from "../controllers/pokemonControllers.js";

const router = express.Router();

router.post("/", checkUser);
router.post("/signup", addUser);
router.get("/auth/pokeball", getPokemons);
router.post("/auth/add", addPokemon);
router.delete("/auth/delete", deletePokemon);
router.put("/auth/edit", editUsername);
router.post("/logout", logoutUser);

export default router;