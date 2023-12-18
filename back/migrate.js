import pg from "pg";
import fs from "fs";
// Chargement de la configuration de la base de données
const rawdata = fs.readFileSync(new URL("./config.json", import.meta.url));
const dbConfig = JSON.parse(rawdata);
const { Pool } = pg;
const pool = new Pool(dbConfig);

const createTables = async () => {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS users (user_id BIGSERIAL PRIMARY KEY, user_name VARCHAR(255) NOT NULL, hashed_password VARCHAR(255) NOT NULL, user_email VARCHAR(255) NOT NULL)",
    [],
  );
};

createTables();
