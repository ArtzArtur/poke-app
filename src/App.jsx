import TheHeader from "./components/TheHeader";
import TheSearch from "./components/TheSearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetails from "./components/PokemonDetails";
function App() {
  return (
    <div className="App max-w-[1200px] mx-auto">
      <TheHeader />
      <Router>
        <Routes>
          <Route path="/poke-app/" element={<TheSearch />}></Route>
          <Route
            path="/poke-app/PokemonDetails/:id"
            element={<PokemonDetails />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
