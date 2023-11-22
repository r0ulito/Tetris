const router = require('koa-router')();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool, getUserByUsername } = require('../database');
const config = require('./config');

// Routes d'inscription et de connexion
router.post('/signup', async (ctx) => {
    const { username, password } = ctx.request.body;
    
    // Vérifi si l'utilisateur existe déjà
    const existingUser = await pool.query('SELECT * FROM users WHERE user_name = $1', [username]);
    if (existingUser.rows.length) {
        ctx.status = 400;
        ctx.body = { message: 'Nom d\'utilisateur déjà pris' };
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query('INSERT INTO users (user_name, hashed_password) VALUES ($1, $2)', [username, hashedPassword]);
        ctx.body = { message: 'Inscription réussie' };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Erreur lors de l\'inscription' };
    }
});

router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body;
    
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE user_name = $1', [username]);
        const user = userResult.rows[0];

        if (user && await bcrypt.compare(password, user.hashed_password)) {
            const token = jwt.sign({ id: user.user_id }, config.jwtSecret, { expiresIn: '2h' });
            ctx.body = { message: 'Connexion réussie', token };
        } else {
            ctx.status = 401;
            ctx.body = { message: 'Identifiants invalides' };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { message: 'Erreur de serveur' };
    }
});

module.exports = router;