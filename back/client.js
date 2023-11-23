import { io as clientIo } from "socket.io-client";

const socket = clientIo("http://localhost:8180");

socket.on("connect", () => {
  console.log("Connecté au serveur");
});
