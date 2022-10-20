import { pool } from "../db.js";

export const index = (req, res) => res.json({ message: "Welcome to my api, by Astudillo Perez Edwin Uriel" });

export const ping = async (req, res) => {
  const [result] = await pool.query('SELECT "pong" as result');
  res.json(result[0]);
};