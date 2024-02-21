import axios from "axios";
import { useEffect, useState } from "react";

const UsePokemon = ({id}) => {
    const [pokemonDatas, setPokemonDatas] = useState({
        error: null ,
        loading: false
    });
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
    const getPokemon = async () => {
      try {
        setPokemonDatas({ loading: true ,error: null});
        const response = await axios.get(BASE_URL +id);
        const pokemonData = response.data;
        const speciesUrl = pokemonData.species.url;
        const speciesResponse = await axios.get(speciesUrl);
        const flavorTextEntries = speciesResponse.data.flavor_text_entries;
        const englishDescription = flavorTextEntries.find(entry => entry.language.name === 'en');
  
        setPokemonDatas({
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.other.dream_world.front_default,
          types: pokemonData.types.map((type) => type.type.name),
          weight: pokemonData.weight,
          height: pokemonData.height,
          abilities: pokemonData.abilities.map((ability) => ability.ability.name),
          description: englishDescription.flavor_text,
          loading: false
        });
      } catch (error) {
        setPokemonDatas(prevState => ({ ...prevState, loading: false, error }));
      }
    };
    useEffect(() => {
      getPokemon();
    }, []);
    return pokemonDatas;
}

export default UsePokemon;
