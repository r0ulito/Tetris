/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import test from "ava";
import io from "socket.io-client";
import http from "http";
import { Server } from "socket.io";
import setupWebSocket from "../websocket.js";

test.beforeEach((t) => {
  const httpServer = http.createServer();
  const ioServer = new Server(httpServer);
  setupWebSocket(ioServer);
  httpServer.listen();

  const { port } = httpServer.address();
  t.context.ioServer = ioServer;
  t.context.httpServer = httpServer;
  t.context.clientSocket = io(`http://localhost:${port}`);
});

test.afterEach((t) => {
  t.context.ioServer.close();
  t.context.clientSocket.close();
  t.context.httpServer.close();
});

test("Déconnexion WebSocket", async (t) => {
  const { clientSocket } = t.context;

  await new Promise((resolve, reject) => {
    clientSocket.on("connect", () => {
      clientSocket.disconnect();
    });

    clientSocket.on("disconnect", () => {
      resolve();
    });

    setTimeout(() => {
      reject(new Error("Timeout: Server did not disconnect the client"));
    }, 5000);
  });

  t.pass();
});
