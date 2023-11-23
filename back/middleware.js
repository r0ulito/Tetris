import cors from "@koa/cors";

const corsOptions = {
  origin: "http://localhost:3000",
};

export default cors(corsOptions);
