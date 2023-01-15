import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
function TheResults({
  data,
  setUrl,
  page,
  setPage,
  searchData,
}) {
  return (
    <div className="text-center py-2 gap-2">
      <div className="flex flex-wrap">
        {searchData
          ? searchData.map((pokemon) => (
              <div
                className="p-2 min-h-[200px] min-w-[300px] mx-auto"
                key={pokemon.name}
              >
                <PokemonCard url={pokemon.url} />
              </div>
            ))
          : null}
      </div>
      {searchData && !searchData.length ? (
        <div className="text-center w-full pt-10">
          <p className="text-lg">Sorry not found...</p>
        </div>
      ) : null}

      <div className="text-center grid sm:grid-cols-2 lg:grid-cols-4 py-2 gap-2">
        {data && !searchData
          ? data.results.map((pokemon) => (
              <div
                key={pokemon.name}
                className=" hover:border-slate-500 cursor-pointer"
              >
                <PokemonCard url={pokemon.url} />
              </div>
            ))
          : null}
        {data && !searchData ? (
          <Pagination
            data={data}
            setUrl={setUrl}
            page={page}
            setPage={setPage}
          />
        ) : null}
      </div>
    </div>
  );
}

export default TheResults;
