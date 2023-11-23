import pg from "pg";
import fs from "fs";

// Chargement de la configuration de la base de données
const rawdata = fs.readFileSync(new URL("./config.json", import.meta.url));
const dbConfig = JSON.parse(rawdata);
const { Pool } = pg;
const pool = new Pool(dbConfig);

// Créer un utilisateur avec nom d'utilisateur, mot de passe haché et e-mail
const createUser = async (username, hashedPassword, email) => {
  const result = await pool.query(
    "INSERT INTO users (user_name, hashed_password, user_email) VALUES ($1, $2, $3) RETURNING user_id",
    [username, hashedPassword, email],
  );

  return result.rows[0].user_id;
};

// Récupérer un utilisateur par son ID
const getUserById = async (userId) => {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    userId,
  ]);
  return result.rows[0];
};

export { pool, createUser, getUserById };
