// import { pool } from "../db.js";

// export const index = (req, res) => res.json({ message: "Welcome to my api, by Astudillo Perez Edwin Uriel" });

// export const ping = async (req, res) => {
//   const [result] = await pool.query('SELECT "pong" as result');
//   res.json(result[0]);
// };

import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/ping", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 + 1 as result");
  console.log(rows[0]);
  res.json(rows[0]);
});

export default router;
