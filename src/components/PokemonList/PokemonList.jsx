import axios from "axios";
import { useEffect, useState } from "react";

import Pokemon from "../Pokemon/Pokemon";


const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]); 
    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";
    const downloadPokemon = async () => {
        const response = await axios.get(POKEDEX_URL);
        const pokemonResults = response.data.results; // array of pokemon, (pokemonName and url)
        const pokemonPromise = pokemonResults.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return pokemonData.data;
        });
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
    }

    useEffect(()=>{
        downloadPokemon();
    },[])
    return (
        <div className="pokemon-list-wrapper py-10">
                <div className="pokemon-list flex flex-wrap justify-center gap-2">
                    {
                    pokemonList.map((pokemon) => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} /> )
                
                    }
                </div>
        </div>
    );
}

export default PokemonList;
