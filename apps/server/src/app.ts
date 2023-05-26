import express from "express";
import cors from "cors";
import { Server } from "http";
import router from "./router";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(router);

export function startServer(): Server {
  const PORT = process.env.PORT ?? 8080;
  const server = app.listen(PORT, () => {
    console.log(`🚀Server running and listening on http://localhost:${PORT}`);
  });
  process.on("SIGTERM", () => {
    server.close();
  });
  return server;
}

export default app;
