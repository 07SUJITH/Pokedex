import { Route, Routes } from "react-router-dom";

import PageNotFound from "./components/PageNotFound/PageNotFound";
import Pokedex from "./components/Pokedex/Pokedex";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Pokedex/>} />
      <Route path="/pokemon/:id" element={<PokemonDetails/>} />
      <Route path="*" element={<PageNotFound/>} />
      
    </Routes>
  );
}

export default App;
