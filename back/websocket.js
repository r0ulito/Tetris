import jwt from "jsonwebtoken";

const setupWebSocket = (io) => {
  //   const connectedUsers = {};

  io.on("connection", (socket) => {
    console.log("Un utilisateur s'est connecté");

    socket.on("authenticate", async (data) => {
      try {
        const user = jwt.verify(data.token, "votre_secret_jwt");
        // socket.userId = user.id; // Stock l'ID de l'utilisateur dans l'objet socket
        console.log(`Utilisateur authentifié avec l'ID : ${user.id}`);
      } catch (error) {
        socket.disconnect(); // Déconnecter si le token est invalide
        console.log("Authentification échouée");
      }
    });

    socket.on("disconnect", () => {
      console.log("Un utilisateur s'est déconnecté");
    });
  });
};

export default setupWebSocket;
