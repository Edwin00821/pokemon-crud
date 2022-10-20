import React, { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { getPokemonData } from "./services/getPokemonData";
import ListOfPokemons from "./components/ListOfPokemons";
import Layout from "./components/common/Layout/Layout";
import { Link } from "react-router-dom";
import { usePokemons } from "./context/PokemonProvider";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUpAlt } from "react-icons/fa";
import Loading from "./components/Loading";

function App() {
  const { pokemons, loadPokemons, createPoke } = usePokemons();
  const [pokeFect, setPokeFetch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    try {
      // console.log('first useEffect');
      loadPokemons();
      if (pokemons.length > 0) {
        setLoading(false);
      }
      // console.log('loadPokemons', pokemons);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // console.log("UseEffect", pokemons, loading);
    if (loading == true && pokemons.length === 0) {
      // console.log("conexion with POKE API");
      getPokemonData().then((pokes) => {
        setPokeFetch(pokes);
        // pokes.map((poke) => {
        //   createPoke(poke);
        // });
        setLoading(false);
      });
    }
  }, []);

  const handleSort = () => {
    pokemons.reverse();
    setSort(!sort);
  };

  return (
    <Layout>
      <div className="bg-[#282c34] min-h-screen ">
        <div className="p-4 flex gap-5 items-center justify-items-center justify-center">
          <div className="p-4 flex gap-9 items-center justify-items-center justify-center rounded-lg border-white border-2 hover:bg-green-700">
            {sort ? (
              <FaSortAmountDown color="white" size={40} onClick={handleSort} />
            ) : (
              <FaSortAmountUpAlt color="white" size={40} onClick={handleSort} />
            )}
          </div>
          <Link to="/newPoke" className="text-white  ">
            <div className="p-4 flex gap-5 items-center justify-items-center justify-center rounded-lg border-white border-2 hover:bg-cyan-700">
              <h2 className="text-lg font-bold">Add Pokemon</h2>
              <AiOutlinePlusSquare color="white" size={40} />
            </div>
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <ListOfPokemons pokemons={pokeFect || pokemons} />
        )}
      </div>
      <div>
        <div className="w-0/100"></div>
        <div className="w-1/100"></div>
        <div className="w-2/100"></div>
        <div className="w-3/100"></div>
        <div className="w-4/100"></div>
        <div className="w-5/100"></div>
        <div className="w-6/100"></div>
        <div className="w-7/100"></div>
        <div className="w-8/100"></div>
        <div className="w-9/100"></div>
        <div className="w-10/100"></div>
        <div className="w-11/100"></div>
        <div className="w-12/100"></div>
        <div className="w-13/100"></div>
        <div className="w-14/100"></div>
        <div className="w-15/100"></div>
        <div className="w-16/100"></div>
        <div className="w-17/100"></div>
        <div className="w-18/100"></div>
        <div className="w-19/100"></div>
        <div className="w-20/100"></div>
        <div className="w-21/100"></div>
        <div className="w-22/100"></div>
        <div className="w-23/100"></div>
        <div className="w-24/100"></div>
        <div className="w-25/100"></div>
        <div className="w-26/100"></div>
        <div className="w-27/100"></div>
        <div className="w-28/100"></div>
        <div className="w-29/100"></div>
        <div className="w-30/100"></div>
        <div className="w-31/100"></div>
        <div className="w-32/100"></div>
        <div className="w-33/100"></div>
        <div className="w-34/100"></div>
        <div className="w-35/100"></div>
        <div className="w-36/100"></div>
        <div className="w-37/100"></div>
        <div className="w-38/100"></div>
        <div className="w-39/100"></div>
        <div className="w-40/100"></div>
        <div className="w-41/100"></div>
        <div className="w-42/100"></div>
        <div className="w-43/100"></div>
        <div className="w-44/100"></div>
        <div className="w-45/100"></div>
        <div className="w-46/100"></div>
        <div className="w-47/100"></div>
        <div className="w-48/100"></div>
        <div className="w-49/100"></div>
        <div className="w-50/100"></div>
        <div className="w-51/100"></div>
        <div className="w-52/100"></div>
        <div className="w-53/100"></div>
        <div className="w-54/100"></div>
        <div className="w-55/100"></div>
        <div className="w-56/100"></div>
        <div className="w-57/100"></div>
        <div className="w-58/100"></div>
        <div className="w-59/100"></div>
        <div className="w-60/100"></div>
        <div className="w-61/100"></div>
        <div className="w-62/100"></div>
        <div className="w-63/100"></div>
        <div className="w-64/100"></div>
        <div className="w-65/100"></div>
        <div className="w-66/100"></div>
        <div className="w-67/100"></div>
        <div className="w-68/100"></div>
        <div className="w-69/100"></div>
        <div className="w-70/100"></div>
        <div className="w-71/100"></div>
        <div className="w-72/100"></div>
        <div className="w-73/100"></div>
        <div className="w-74/100"></div>
        <div className="w-75/100"></div>
        <div className="w-76/100"></div>
        <div className="w-77/100"></div>
        <div className="w-78/100"></div>
        <div className="w-79/100"></div>
        <div className="w-80/100"></div>
        <div className="w-81/100"></div>
        <div className="w-82/100"></div>
        <div className="w-83/100"></div>
        <div className="w-84/100"></div>
        <div className="w-85/100"></div>
        <div className="w-86/100"></div>
        <div className="w-87/100"></div>
        <div className="w-88/100"></div>
        <div className="w-89/100"></div>
        <div className="w-90/100"></div>
        <div className="w-91/100"></div>
        <div className="w-92/100"></div>
        <div className="w-93/100"></div>
        <div className="w-94/100"></div>
        <div className="w-95/100"></div>
        <div className="w-96/100"></div>
        <div className="w-97/100"></div>
        <div className="w-98/100"></div>
        <div className="w-99/100"></div>
        <div className="w-100/100"></div>
      </div>
    </Layout>
  );
}

export default App;
