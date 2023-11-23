import Koa from "koa";
import http from "http";
import bodyParser from "koa-bodyparser";
import koaJwt from "koa-jwt";
import fs from "fs";
import corsMiddleware from "./middleware.js";
import authRoutes from "./auth.js";
import generalRoutes from "./routes.js";
import setupWebSocket from "./websocket.js";

// Chargement de la configuration à partir de config.json
const rawConfig = fs.readFileSync(new URL("./config.json", import.meta.url));
const config = JSON.parse(rawConfig);

const app = new Koa();
const server = http.createServer(app.callback());

// Middleware d'erreur global
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
    console.error("Erreur capturée: ", err.message);
  }
});

// Importation dynamique de socket.io
import("socket.io").then((socketIoModule) => {
  // Création de l'instance socket.io en utilisant .attach()
  const io = new socketIoModule.Server();
  io.attach(server);

  // Ajout des autres middlewares
  app.use(corsMiddleware);
  app.use(bodyParser());
  app.use(
    koaJwt({ secret: config.jwt_secret }).unless({
      path: [/^\/public/, /^\/login/, /^\/signup/],
    }),
  );
  app.use(authRoutes.routes());
  app.use(generalRoutes.routes());

  setupWebSocket(io);

  const PORT = 8180;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
