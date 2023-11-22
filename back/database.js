import pg from "pg";
import fs from "fs";

// Chargement de la configuration de la base de données
const rawdata = fs.readFileSync(new URL("./config.json", import.meta.url));
const dbConfig = JSON.parse(rawdata);

const { Pool } = pg;
const pool = new Pool(dbConfig);

const createUser = async (username, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (user_name, hashed_password) VALUES ($1, $2) RETURNING user_id",
    [username, hashedPassword],
  );
  return result.rows[0].user_id;
};

const getUserByUsername = async (userId) => {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    userId,
  ]);
  return result.rows[0];
};

export { pool, createUser, getUserByUsername };
