import pool from "./db.js";

async function initDB() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id serial PRIMARY KEY,
      username text NOT NULL UNIQUE,
      password_hash text NOT NULL,
      created_at timestamp DEFAULT NOW(),
      updated_at timestamp DEFAULT NOW(),
      CONSTRAINT username_trim CHECK (username=trim(username)),
      CONSTRAINT username_lowercase CHECK (username=lower(username)),
      CONSTRAINT username_length CHECK ((length(username))>=3)  
    );`);
    await pool.query(`CREATE TABLE IF NOT EXISTS owns(
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      pokemon text NOT NULL,
      created_at timestamp DEFAULT NOW(),
      updated_at timestamp DEFAULT NOW(),
      CONSTRAINT pokemon_trim CHECK (pokemon=trim(pokemon)),
      CONSTRAINT pokemon_lowercase CHECK (pokemon=lower(pokemon)),
      CONSTRAINT pokemon_length CHECK ((length(pokemon))>=3),
      CONSTRAINT unique_userid_pokemon UNIQUE(user_id,pokemon)   
    );`);
    console.log("DB started");
  }
  catch (err) {
    console.log(`DB could not start : ${err.message}`);
    process.exit(1);
  }
}

export default initDB;