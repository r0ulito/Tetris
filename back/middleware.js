import cors from "@koa/cors";

const corsOptions = {
  origin: "http://localhost:3000",
  // Vous pouvez ajouter d'autres options ici si nécessaire
};

export default cors(corsOptions);
