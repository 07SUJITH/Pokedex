import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";

const Pokedex = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="m-2 tracking-[6px] font-bold text-3xl ">Pokedex</h1>
            <Search />
            <PokemonList/>
        </div>
    );
}

export default Pokedex;
