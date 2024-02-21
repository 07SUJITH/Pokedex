import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const [pokemonData, setPokemonData] = useState({});
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
  const getPokemon = async () => {
    try {
      const response = await axios.get(BASE_URL +id);
      const pokemonData = response.data;
      console.log(pokemonData);
      setPokemonData(pokemonData);
      const speciesUrl = pokemonData.species.url;
      const speciesResponse = await axios.get(speciesUrl);
      const flavorTextEntries = speciesResponse.data.flavor_text_entries;
      const englishDescription = flavorTextEntries.find(entry => entry.language.name === 'en');
      setDescription(englishDescription.flavor_text);
    } catch (error) {
        console.error(error);
    }
  };
  useEffect(() => {
    getPokemon();
  }, []);
  return (
    <>
      {pokemonData && (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={pokemonData.sprites?.other?.dream_world.front_default}
              className="max-w-sm rounded-lg shadow-2xl p-4"
            />
            <div>
              <h1 className="text-5xl font-bold">{pokemonData.name}</h1>
              <p className="py-6">{description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
              <div className="badge rounded-md badge-neutral">weight:{pokemonData.weight}</div>
              <div className="badge rounded-md badge-neutral">height{ pokemonData.height}</div>
              
              </div>
              <p className="py-6 flex flex-col sm:flex-row">

              <ul   className="max-w-sm rounded-lg shadow-2xl mb-3 p-2 min-w-[200px]">
                <li className="font-bold  badge badge-outline">Abilities</li>
                {pokemonData.abilities?.map((ability, index) => (
                    <li className="p-1" key={index}>{ability.ability.name}</li>
                ))}
            </ul>
            <ul   className="max-w-sm rounded-lg shadow-2xl mb-3 p-2 min-w-[200px]">
                <li className="font-bold  badge badge-outline">Abilities</li>
                {pokemonData.types?.map((type, index) => (
                    <li className="p-1" key={index}>{type.type.name}</li>
                ))}
            </ul>
            
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
