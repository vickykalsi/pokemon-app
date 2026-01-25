import pool from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function fetchPokemonsInPokeball(listOfPokemons) {
  try {
    return listOfPokemons.map(async (pokemon) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await response.json();
      return { name: data.name, image: data?.sprites?.front_shiny};
    })
  }
  catch (err) {
    return res.status(500).json({ status: "failure", message: "could not catch pokemon in your pokeball" });
  }
}

export async function checkUser(req, res) {
  try {
    const { username, password } = req.body;
    const response1 = await pool.query(`select id,username,password_hash from users where username=$1`, [username.trim().toLowerCase()]);
    if (response1.rows.length === 0) {
      return res.status(401).json({ status: "failure", message: "no such user exists, kindly sign up" });
    }
    if (await bcrypt.compare(password, response1.rows[0].password_hash)) {
      const token = jwt.sign({ id: response1.rows[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "none" });
      return res.status(200).json({ status: "success", message: "user successfully logged in", data: { username } });
    }
    return res.status(401).json({ status: "failure", message: "incorrect credentials used" });
  }
  catch (err) {
    res.status(500).json({ status: "failure", message: "internal server error" });
  }
}

export async function addUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!password || password.length < 8) {
      return res.status(400).json({ status: "failure", message: "password must be more than 8 characters long" });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const response1 = await pool.query(`insert into users(username,password_hash) values($1,$2) returning username`, [username.trim().toLowerCase(), password_hash]);
    return res.status(201).json({ status: "success", message: "new user successfully created", data: { username: response1.rows[0].username } });
  }
  catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ status: "failure", message: "user with the same username already exists, please enter a new username" });
    }
    if (err.code === "23514") {
      return res.status(400).json({ status: "failure", message: "username must be in lowercase, without spaces and more than 2 characters long." });
    }
    res.status(500).json({ status: "failure", message: "internal server error" });
  }
}

export async function getPokemons(req, res) {
  try {
    const { id } = req.user;
    const response1 = await pool.query(`select pokemon from owns where user_id=$1`, [id]);
    const listOfPokemons = response1.rows.map(row => row.pokemon.trim().toLowerCase());
    const pokemonsInPokeball = await Promise.all(fetchPokemonsInPokeball(listOfPokemons));
    const response2 = await pool.query(`select username from users where id=$1`, [id]);
    return res.status(200).json({ status: "success", message: "here is your pokeball", data: { username: response2.rows[0].username, pokemonsInPokeball } });
  }
  catch (err) {
    res.status(500).json({ status: "failure", message: "internal server error" });
  }
}

export async function addPokemon(req, res) {
  try {
    const { id } = req.user;
    await pool.query(`insert into owns(user_id,pokemon) values($1,$2)`, [id, req.body.newPokemon.trim().toLowerCase()]);
    return res.status(201).json({ status: "success", message: `${req.body.newPokemon.trim().toLowerCase()} added in your pokeball` });
  }
  catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ status: "failure", message: "pokemon already exists in your pokeball" });
    }
    if (err.code === "23502") {
      return res.status(400).json({ status: "failure", message: "not a valid pokemon name" });
    }
    res.status(500).json({ status: "failure", message: "internal server error" });
  }
}


export async function deletePokemon(req, res) {
  try {
    const { id } = req.user;
    await pool.query(`delete from owns where user_id=$1 and pokemon=$2`, [id, req.body.pokemon.trim().toLowerCase()]);
    const response1 = await pool.query(`select pokemon from owns where user_id=$1`, [id]);
    const listOfPokemons = response1.rows.map(row => row.pokemon.trim().toLowerCase());
    const pokemonsInPokeball = await Promise.all(fetchPokemonsInPokeball(listOfPokemons));
    return res.status(200).json({ status: "success", message: `${req.body.pokemon.trim().toLowerCase()} removed from pokeball`, data: { pokemonsInPokeball } });
  }
  catch (err) {
    res.status(500).json({ status: "failure", message: "internal server error" });
  }
}

export async function editUsername(req, res) {
  try {
    const { id } = req.user;
    const { username } = req.body;
    if (username.trim().length < 3) {
      return res.status(400).json({ status: "failure", message: "username must be 3 or more characters long" });
    }
    await pool.query(`update users set username=$1,updated_at=NOW() where id=$2`, [username.trim().toLowerCase(), id]);
    return res.status(200).json({ status: "success", message: "username successfully updated", data: { username: username.trim().toLowerCase() } });
  }
  catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ status: "failure", message: "user with same username already exists" });
    }
    if (err.code === "23514") {
      return res.status(400).json({ status: "failure", message: "username must be in lowercase, without spaces and more than 2 characters long." });
    }
    res.status(500).json({ status: "failure", message: "internal server error" });
  }
}

export function logoutUser(req, res) {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV==="production", sameSite: "lax" });
  return res.status(200).json({ status: "success", message: "user logged out" });
}
