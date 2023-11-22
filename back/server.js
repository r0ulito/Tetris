const Koa = require('koa');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('koa-bodyparser');
const koaJwt = require('koa-jwt');
const config = require('./config');
const authRoutes = require('./auth');
const generalRoutes = require('./routes');
const setupWebSocket = require('./websocket');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketIo(server);

app.use(bodyParser());
app.use(authRoutes.routes());
app.use(generalRoutes.routes());
app.use(koaJwt({ secret: config.jwtSecret }).unless({ path: [/^\/public/, /^\/login/, /^\/signup/] }));

setupWebSocket(io);

const PORT = process.env.PORT || 8180;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});