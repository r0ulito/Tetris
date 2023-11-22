const router = require('koa-router')();
const db = require('./database');

// Route d'accueil
router.get('/', async (ctx) => {
    ctx.body = 'Bienvenue sur Tetris Online!';
});

// // Route pour obtenir des informations sur le jeu ou le statut du serveur
// router.get('/status', async (ctx) => {
//     ctx.body = { status: 'Le serveur fonctionne correctement' };
// });

// // Route pour récupérer le score d'un utilisateur
// router.get('/score/:userId', async (ctx) => {
//     const userId = ctx.params.userId;
//     const score = await db.getUserScore(userId);
//     ctx.body = { userId, score };
// });

// // Route pour mettre à jour le score d'un utilisateur
// router.post('/score/update', async (ctx) => {
//     const { userId, score } = ctx.request.body;
//     await db.updateUserScore(userId, score);
//     ctx.body = { message: 'Score mis à jour' };
// });

// Ajoutez d'autres routes selon les besoins de votre jeu

module.exports = router;