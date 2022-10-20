import { pool } from "../db.js";

export const getPokemons = async (req, res) => {
  try {
    const RESPONSE_POKE = await pool.query("SELECT * FROM MPokemon");
    // console.log({ RESPONSE_POKE });
    const POKES = await RESPONSE_POKE[0].map(async (pokemon) => {
      const { id_poke } = await pokemon;
      // console.log({ id_poke });

      const RESPONSE_TYPE = await pool.query(
        "SELECT MType.id_ctype, name_type FROM MType INNER JOIN CType ON MType.id_ctype = CType.id_ctype where id_poke = ?",
        [id_poke]
      );
      // console.log({ RESPONSE_TYPE });
      const [data] = await pool.query(
        "SELECT * FROM MStats where id_poke = ?",
        [id_poke]
      );
      // console.log({ data: data[0] });
      const { hp, atk, def, sp_atk, sp_def, speed } = await data[0];
      // console.log({ hp, atk, def, sp_atk, sp_def, speed });

      const FORMAT_DATA = await {
        ...pokemon,
        types: RESPONSE_TYPE[0],
        stats: [
          { id: 1, name: "hp", base_stat: hp },
          { id: 2, name: "attack", base_stat: atk },
          { id: 3, name: "defense", base_stat: def },
          { id: 4, name: "special-attack", base_stat: sp_atk },
          { id: 5, name: "special-defense", base_stat: sp_def },
          { id: 6, name: "speed", base_stat: speed },
        ],
      };
      // console.log({FORMAT_DATA});
      return await FORMAT_DATA;
    });

    // console.log({ POKES });
    const DATA_POKES = await Promise.all(POKES);

    res.status(200).json(DATA_POKES);
  } catch (error) {
    console.log(error);
    return await res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getPoke = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM MPokemon WHERE id_poke = ?",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Pokemon not found" });
    }
    const { id_poke } = await rows[0];
    const RESPONSE_TYPE = await pool.query(
      "SELECT MType.id_ctype, name_type FROM MType INNER JOIN CType ON MType.id_ctype = CType.id_ctype where id_poke = ?",
      [id_poke]
    );
    const RESPONSE_STATS = await pool.query(
      "SELECT * FROM MStats where id_poke = ?",
      [id_poke]
    );
    const { hp, atk, def, sp_atk, sp_def, speed } = await RESPONSE_STATS[0][0];

    const DATA_POKES = await {
      ...rows[0],
      types: RESPONSE_TYPE[0],
      stats: [
        { id: 1, name: "hp", base_stat: hp },
        { id: 2, name: "attack", base_stat: atk },
        { id: 3, name: "defense", base_stat: def },
        { id: 4, name: "special-attack", base_stat: sp_atk },
        { id: 5, name: "special-defense", base_stat: sp_def },
        { id: 6, name: "speed", base_stat: speed },
      ],
    };
    console.log({ DATA_POKES });
    res.json(DATA_POKES);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getPokeByName = async (req, res) => {
  try {
    const RESPONSE_POKE = await pool.query(
      "SELECT * FROM MPokemon WHERE name_poke like ?",
      [`%${req.params.query}%`]
    );

    const POKES = await RESPONSE_POKE[0].map(async (pokemon) => {
      const { id_poke } = await pokemon;

      const RESPONSE_TYPE = await pool.query(
        "SELECT MType.id_ctype, name_type FROM MType INNER JOIN CType ON MType.id_ctype = CType.id_ctype where id_poke = ?",
        [id_poke]
      );
      const RESPONSE_STATS = await pool.query(
        "SELECT * FROM MStats where id_poke = ?",
        [id_poke]
      );
      const { hp, atk, def, sp_atk, sp_def, speed } =
        await RESPONSE_STATS[0][0];

      return await {
        ...pokemon,
        types: RESPONSE_TYPE[0],
        stats: [
          { id: 1, name: "hp", base_stat: hp },
          { id: 2, name: "attack", base_stat: atk },
          { id: 3, name: "defense", base_stat: def },
          { id: 4, name: "special-attack", base_stat: sp_atk },
          { id: 5, name: "special-defense", base_stat: sp_def },
          { id: 6, name: "speed", base_stat: speed },
        ],
      };
    });

    const DATA_POKES = await Promise.all(POKES);

    res.json(DATA_POKES);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createPoke = async (req, res) => {
  try {
    const {
      id_poke,
      name_poke,
      weight_poke,
      height_poke,
      ability,
      img_poke,
      stats: [
        { base_stat: hp },
        { base_stat: atk },
        { base_stat: def },
        { base_stat: sp_atk },
        { base_stat: sp_def },
        { base_stat: speed },
      ],
      types,
    } = await req.body;

    const [{ insertId }] = await pool.query(
      "INSERT INTO MPokemon VALUES (?, ?, ?, ?, ?, ?)",
      [id_poke, name_poke, weight_poke, height_poke, ability, img_poke]
    );

    await pool.query("INSERT INTO MStats VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
      null,
      insertId,
      hp,
      atk,
      def,
      sp_atk,
      sp_def,
      speed,
    ]);

    await types.map(async ({ id_ctype, name_type }) => {
      await pool.query("INSERT INTO MType VALUES (?, ?, ?)", [
        null,
        insertId,
        id_ctype || getTypeId(name_type),
      ]);
    });
    console.log("Pokemon created");
    res.status(201).json({ message: "Pokemon created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deletePoke = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const [rows] = await pool.query("DELETE FROM MStats WHERE id_poke = ?", [
      id,
    ]);

    // console.log(rows);
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Pokemon not found" });
    }
    const Data = await pool.query("DELETE FROM MType WHERE id_poke = ?", [id]);

    console.log(Data);
    const Data2 = await pool.query("DELETE FROM MPokemon WHERE id_poke = ?", [
      id,
    ]);

    // console.log(Data2);

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updatePoke = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const {
      id_poke,
      name_poke,
      weight_poke,
      height_poke,
      ability,
      img_poke,
      stats: [
        { base_stat: hp },
        { base_stat: atk },
        { base_stat: def },
        { base_stat: sp_atk },
        { base_stat: sp_def },
        { base_stat: spd },
      ],
      types,
    } = await req.body;

    const [rows] = await pool.query(
      "UPDATE MStats SET id_poke = ?, hp = ?, atk = ?, def = ?, sp_atk = ?, sp_def = ?, speed = ? WHERE id_poke = ?",
      [id_poke, hp, atk, def, sp_atk, sp_def, spd, id]
    );

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Pokemnon not found" });
    }

    await types.map(async ({ id_ctype }) => {
      await pool.query(
        "UPDATE MType SET id_poke = ?, id_ctype = ? WHERE id_poke = ? && id_ctype = ? ",
        [id_poke, id_ctype, id, id_ctype]
      );
    });

    await pool.query(
      "UPDATE MPokemon SET id_poke = ?, name_poke = ?, weight_poke = ?, height_poke = ?, ability = ?, img_poke = ? WHERE id_poke = ?",
      [id_poke, name_poke, weight_poke, height_poke, ability, img_poke, id]
    );

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

function getTypeId(name) {
  name = name.toLowerCase();
  if (name === "normal") return 1;
  if (name === "fire") return 2;
  if (name === "water") return 3;
  if (name === "grass") return 4;
  if (name === "electric") return 5;
  if (name === "ice") return 6;
  if (name === "fighting") return 7;
  if (name === "poison") return 8;
  if (name === "ground") return 9;
  if (name === "flying") return 10;
  if (name === "psychic") return 11;
  if (name === "bug") return 12;
  if (name === "rock") return 13;
  if (name === "ghost") return 14;
  if (name === "dragon") return 15;
  if (name === "dark") return 16;
  if (name === "steel") return 17;
  if (name === "fairy") return 18;
}
