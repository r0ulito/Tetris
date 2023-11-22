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
