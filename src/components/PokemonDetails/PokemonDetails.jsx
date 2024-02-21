import { useParams } from "react-router-dom";

import UsePokemon from "../../hooks/usePokemon";

const PokemonDetails = () => {
  const { id } = useParams();
  const pokemonDatas = UsePokemon({id});
  if (pokemonDatas.error) {
    return <div>Error: {pokemonDatas.error.message}</div>;
  }
  return (
    <>
      { pokemonDatas.loading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span> 
        </div>
      ):
      pokemonDatas && (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={pokemonDatas.image}
              className="max-w-sm rounded-lg shadow-2xl p-4"
            />
            <div>
              <h1 className="text-5xl font-bold">{pokemonDatas.name}</h1>
              <p className="py-6">{pokemonDatas.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
              <div className="badge rounded-md badge-neutral">weight:{pokemonDatas.weight}</div>
              <div className="badge rounded-md badge-neutral">height{ pokemonDatas.height}</div>
              
              </div>
              <div className="py-6 flex flex-col sm:flex-row">

              <ul   className="max-w-sm rounded-lg shadow-2xl mb-3 p-2 min-w-[200px]">
                <li className="font-bold  badge badge-outline">Abilities</li>
                { pokemonDatas.abilities && pokemonDatas.abilities.map((ability, index) => (
                    <li className="p-1" key={index}>{ability}</li>
                ))}
            </ul>
            <ul   className="max-w-sm rounded-lg shadow-2xl mb-3 p-2 min-w-[200px]">
                <li className="font-bold  badge badge-outline">Types</li>
                {pokemonDatas.types && pokemonDatas.types.map((type, index) => (
                    <li className="p-1" key={index}>{type}</li>
                ))}
            </ul>
            
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
