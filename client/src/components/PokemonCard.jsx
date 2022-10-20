import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaWeight, FaRulerVertical } from "react-icons/fa";
import {
  getPokemonBgColor,
  getPokemonTxtColor,
} from "./../libs/getPokemonColor";
import PokemonElement from "./PokemonElement";
import Stats from "./Stats";
import { Link } from "react-router-dom";
import { usePokemons } from "./../context/PokemonProvider";

export default function PokemonCard({
  abilities,
  height,
  id,
  img,
  name,
  stats,
  types,
  weight,
}) {
  const { deletePoke } = usePokemons();
  
  return (
    <div className="h-full w-[22.5rem] bg-white shadow-2xl p-3 rounded-2xl z-50">
      <section
        className={`${getPokemonBgColor(
          types[0].name_type
        )} rounded-2xl pb-2 relative`}
      >
        <div className="font-bold text-center text-white flex p-5 justify-between">
          <h2 className="text-2xl uppercase">{name}</h2>
          <p className="text-2xl uppercase">#{id}</p>
          <Link to={`/${id}`} className="z-10">
            <AiOutlineEdit color="white" size={32} />
          </Link>
          <button onClick={() => deletePoke(id)} className={" z-10"}>
            <AiOutlineDelete color="white" size={32} />
          </button>
        </div>
        <img
          src="/images/Pokeball.png"
          alt="Pokeball"
          className="w-[12.5rem] h-[12.5rem] absolute top-3 right-3 z-0"
        />
        <div className="flex justify-center">
          <img
            src={img}
            alt={name}
            className="-mt-5 -mb-20 w-[12.5rem] h-[12.5rem] z-10"
          />
        </div>
        <div className="bg-white mx-2 rounded-2xl p-5 pt-20">
          <PokemonElement types={types} />
          <div>
            <h3
              className={`${getPokemonTxtColor(
                types[0].name_type
              )} font-bold text-center m-3 text-[1rem]`}
            >
              About
            </h3>
            <section className="grid grid-cols-3 text-black text-[0.625rem]">
              <div className="border-r-2">
                <div className="flex gap-3 items-center justify-center ">
                  <FaWeight />
                  <p>{weight} kg</p>
                </div>
                <h3 className="text-[0.6rem] text-center">Weight</h3>
              </div>
              <div className="border-r-2">
                <div className="flex gap-3 items-center justify-center ">
                  <FaRulerVertical />
                  <p>{height} m</p>
                </div>
                <h3 className="text-[0.6rem] text-center">Height</h3>
              </div>
              <div>
                <p className=" first-letter:uppercase text-center">
                  {abilities}
                </p>
                <h3 className="text-[0.6rem] text-center">Abilitie</h3>
              </div>
            </section>
          </div>
          <Stats stats={stats} types={types} />
        </div>
      </section>
    </div>
  );
}
