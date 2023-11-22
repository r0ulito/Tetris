const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.dbConfig);

const createUser = async (username, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (user_name, hashed_password) VALUES ($1, $2) RETURNING user_id', 
        [username, hashedPassword]
    );
    return result.rows[0].user_id;
};

const getUserByUsername = async (user_id) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE user_id = $1', 
        [user_id]
    );
    return result.rows[0];
};

// const updateUserScore = async (userId, score) => {};

module.exports = {
    pool,
    createUser,
    getUserByUsername
};