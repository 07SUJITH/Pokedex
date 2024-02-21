import axios from "axios";
import { useEffect, useState } from "react";

const UsePokemonList = () => {
    const DEFAULT_URL = "https://pokeapi.co/api/v2/pokemon";

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        pokedexUrl: DEFAULT_URL,
        nextUrl: DEFAULT_URL,
        prevUrl: DEFAULT_URL,
        page:  1,
        loading: false,
        error: null 
    });

    const downloadPokemon = async () => {
        setPokemonListState(prevState => ({ ...prevState, loading: true, error: null })); 
        try {
            const response = await axios.get(pokemonListState.pokedexUrl ? pokemonListState.pokedexUrl : DEFAULT_URL);
            const pokemonResults = response.data.results;
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
            setPokemonListState({
                ...pokemonListState,
                pokemonList: pokemonFinalList,
                nextUrl: response.data.next,
                prevUrl: response.data.previous,
                loading: false 
            });
        } catch (error) {
            setPokemonListState(prevState => ({ ...prevState, loading: false, error })); // Set loading to false and store the error
        }
    };

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState];
}

export default UsePokemonList;
