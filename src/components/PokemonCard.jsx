import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function PokemonCard(props) {
  const url = props.url;
  const id = url.split("/")[6];
  const handleDetails = async () => {
    const resp = await fetch(url);
    const json = await resp.json();
    json.color = json.types[0].type.name;
    return json;
  };
  const handleImgs = (e, source) => {
    if (source) {
      e.target.src = source;
    }
  };

  const { data } = useQuery(url, handleDetails);
  return (
    <Link to={`/poke-app/PokemonDetails/${id}`}>
      <div className="text-white">
        {data ? (
          <div
            className="hover:opacity-75 grid justify-center items-between min-h-[375px] p-2"
            style={{ background: `${colours[data.color]}` }}
          >
            <header className="flex flex-col my-2">
              <p className="first-letter:uppercase text-2xl bg-slate-900 bg-opacity-50 p-2 rounded font-bold mb-4">
                {data.name}
              </p>

              <div className="flex justify-around w-full">
                {data.types.map((type, idx) => (
                  <p
                    key={idx}
                    className="first-letter:uppercase text-lg bg-slate-700 bg-opacity-50 px-1 rounded"
                  >
                    {type.type.name}
                  </p>
                ))}
              </div>
            </header>
            <img
              className="max-w-[150px] justify-self-center"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
              alt="No image :("
              onError={(e) => handleImgs(e, data.sprites.front_default)}
            />
          </div>
        ) : (
          <div className="min-h-[375px] grid place-content-center skeleton-loader animate">
            <p>Loading..</p>
            <div className="w-[130px] h-[25px] my-2 bg-slate-300"></div>
            <div className="w-[130px] h-[15px] my-2 bg-slate-300"></div>
            <div className="mt-1 h-[130px] w-[130px] bg-slate-300 rounded-full"></div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default PokemonCard;
