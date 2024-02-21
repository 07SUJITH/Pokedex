import axios from "axios";
import { useEffect, useState } from "react";

import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";
  const [pokedexUrl, setPokedexUrl] = useState(DEFAULT_URL);
  const [nextUrl, setNextUrl] = useState(DEFAULT_URL);
  const [prevUrl, setPrevUrl] = useState(DEFAULT_URL);
  const [page, setPage] = useState(1);

  const downloadPokemon = async () => {
    console.log(pokedexUrl);
    const response = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT_URL);
    const pokemonResults = response.data.results; // array of pokemon, (pokemonName and url)
    const pokemonPromise = pokemonResults.map(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      return pokemonData.data;
    });
    console.log(pokemonResults);
    const pokemonData = await Promise.all(pokemonPromise);
    const pokemonFinalList = pokemonData.map((pokemon) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types.map((type) => type.type.name),
      };
    });
    setPokemonList(pokemonFinalList);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
  };

  useEffect(() => {
    downloadPokemon();
  }, [pokedexUrl]);
  return (
    <>
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => {
            setPokedexUrl(prevUrl);
            setPage(page > 1 ? page - 1 : page);
          }}
        >
          «
        </button>
        <button className="join-item btn">{page}</button>
        <button
          className="join-item btn"
          onClick={() => {
            setPokedexUrl(nextUrl);
            setPage(page + 1);
          }}
        >
          »
        </button>
      </div>
      <div className="pokemon-list-wrapper py-10">
        <div className="pokemon-list flex flex-wrap justify-center gap-2">
          {pokemonList.map((pokemon) => (
            <Pokemon
              name={pokemon.name}
              key={pokemon.id}
              url={pokemon.image}
              id={pokemon.id}
              types={[pokemon.types[0], pokemon.types[1]]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PokemonList;
