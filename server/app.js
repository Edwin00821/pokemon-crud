
import express from "express";
import cors from "cors";
import morgan from "morgan";
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';

import pokemonsRoutes from "./routes/pokemons.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());  // CORS

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api/pokemon", pokemonsRoutes);

// Static files
// app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.static(join(__dirname, '../client/dist')))

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;