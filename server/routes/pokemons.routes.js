import { Router } from "express";
import {
  getPokemons,
  getPoke,
  createPoke,
  deletePoke,
  updatePoke,
  getPokeByName
} from "../controllers/pokemons.controller.js";

const router = Router();

// GET all Pokemons
router.get("/", getPokemons);

// Set route to get a single Pokemon

// INSERT A Poke
router.post("/", createPoke);

// GET BY ID and NAME A Poke
router.get("/:id", getPoke);

// SEARCH A Poke
router.get("/search/:query", getPokeByName);

// DELETE A Poke
router.delete("/:id", deletePoke);

// UPDATE A Poke
router.put("/:id", updatePoke);

export default router;
