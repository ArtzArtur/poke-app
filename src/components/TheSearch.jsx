import { useState } from "react";
import TheResults from "./TheResults";
import { useQuery } from "react-query";

function TheSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [notFound, setNotFound] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const [typingErr, setTypingErr] = useState(false);
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };

  const getSearchData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=2000`
    );
    const json = await response.json();
      const filteredData = json.results.filter((poke) =>
        poke.name.toLowerCase().includes(pokemon.toLowerCase())
      );
      return filteredData;
  };

  const handleKeyPressSearch = (e, name) => {
    if (e.which == 13) {
      handleSearch(name);
    }
  };

  const handleSearch = (name) => {
    if (name.trim() != "" && name.length > 2) {
      setTypingErr(false);
      setPokemon(name);
      setSearching(true);
    } else {
      setTypingErr(true);
    }
  };
  
  const handleReset = () => {
    setPokemon("");
    setPage(1);
    setUrl("https://pokeapi.co/api/v2/pokemon/");
  };

  const { data, isLoading } = useQuery(["list", url], () => getData(url), {
    keepPreviousData: true,
  });
  const { data: searchData } = useQuery(
    ["search", pokemon],
    () => getSearchData(pokemon),
    {
      enabled: searching,
    }
    );


    return (
    <div>
      <section>
        <div className="flex flex-col py-[100px] bg-red-50 items-center text-slate-600">
          <input
            className="m-2 p-2 max-w-[300px] mx-auto border-2 border-slate-500 text-center focus:outline-none rounded-md"
            type="text"
            placeholder="Type pokemon name"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => handleKeyPressSearch(e, searchValue)}
          />
          <div className="flex">
            <button
              className="border-2 border-slate-500 px-2 py-1 rounded-md hover:bg-black hover:text-white"
              onClick={() => handleSearch(searchValue)}
            >
              Search
            </button>
            <button
              onClick={() => handleReset()}
              className="px-1 mx-2 py-1 rounded-md bg-red-800 text-[0.75rem] text-white my-1 hover:text-red-800 hover:bg-white"
            >
              Reset
            </button>
            {typingErr ? (
              <p className="text-red-600">Type at least 3 chars</p>
            ) : null}
          </div>
        </div>

        {data ? (
          <div>
            <TheResults
              notFound={notFound}
              searchData={searchData}
              searchLoading={searchData}
              setUrl={setUrl}
              data={data}
              isLoading={isLoading}
              pokemon={pokemon}
              page={page}
              setPage={setPage}
            />
          </div>
        ) : null}

        {isLoading ? (
          <div className="text-center pt-[70px]">Loading..</div>
        ) : null}
      </section>
    </div>
  );
}

export default TheSearch;
