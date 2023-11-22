<<<<<<< HEAD
import Koa from "koa";
import http from "http";
import bodyParser from "koa-bodyparser";
import koaJwt from "koa-jwt";
import fs from "fs";
import authRoutes from "./auth.js";
import generalRoutes from "./routes.js";
import setupWebSocket from "./websocket.js";

// Chargement de la configuration à partir de config.json
const rawConfig = fs.readFileSync(new URL("./config.json", import.meta.url));
const config = JSON.parse(rawConfig);

const app = new Koa();
const server = http.createServer(app.callback());

// Importation dynamique de socket.io
import("socket.io").then((socketIoModule) => {
  // Création de l'instance socket.io en utilisant .attach()
  const io = new socketIoModule.Server();
  io.attach(server);

  app.use(bodyParser());
  app.use(authRoutes.routes());
  app.use(generalRoutes.routes());
  app.use(
    koaJwt({ secret: config.jwt_secret }).unless({
      path: [/^\/public/, /^\/login/, /^\/signup/],
    }),
  );

  setupWebSocket(io);

  const PORT = 8180;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
=======
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
>>>>>>> f52c3855ff7f9d4973278e5992d58fd20fd19786
