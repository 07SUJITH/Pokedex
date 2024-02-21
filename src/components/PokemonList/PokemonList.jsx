

import UsePokemonList from "../../hooks/usePokemonList";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {

  const [pokemonListState, setPokemonListState] = UsePokemonList();
  if (pokemonListState.error) {
    return <div>Error: {pokemonListState.error.message}</div>;
  }
  return (  
    <>
      {pokemonListState.loading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span> 
        </div>
      ) : (
        <>
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => {
                setPokemonListState({
                  ...pokemonListState,
                  pokedexUrl: pokemonListState.prevUrl,
                  page: pokemonListState.page >  1 ? pokemonListState.page -  1 :  1,
                });
              }}
            >
              «
            </button>
            <button className="join-item btn">{pokemonListState.page}</button>
            <button
              className="join-item btn"
              onClick={() => {
                setPokemonListState({
                  ...pokemonListState,
                  pokedexUrl: pokemonListState.nextUrl,
                  page: pokemonListState.page +  1,
                });
              }}
            >
              »
            </button>
          </div>
          <div className="pokemon-list-wrapper py-10">
            <div className="pokemon-list flex flex-wrap justify-center gap-2">
              {pokemonListState.pokemonList.map((pokemon) => (
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
      )}
    </>
  );
};

export default PokemonList;
