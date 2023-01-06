import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { colours } from "./PokemonCard";

function PokemonDetails() {
  const { id } = useParams();
  const getData = async () => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const json = await resp.json();
    json.color = json.types[0].type.name;
    return json;
  };
  const { data, isLoading } = useQuery(id, getData);
  console.log(data);

  return (
    <div>
      <div className="text-center my-4">
        <Link
          to="/poke-app/"
          className="shadow-[0px_0px_1px_black] p-2 hover:bg-slate-200"
        >
          Back to main page
        </Link>
      </div>
      {isLoading ? (
        <div className="text-center pt-[70px]">Loading..</div>
      ) : null}
      {data ? (
        <div
          className="flex flex-col items-center"
          style={{ background: `${colours[data.color]}` }}
        >
          <h1 className="uppercase p-4 text-3xl font-[900]">{data.name}</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-4">
            <div className="pokemon-details-card">
              <h2 className="font-semibold">Basic info: </h2>
              <p>Height: {data.height / 10} m</p>
              <p>Weight: {data.weight / 10} kg</p>
              <p>Base exp: {data.base_experience} XP</p>
            </div>
            <div className="pokemon-details-card">
              <h2 className="font-semibold">Abilities: </h2>
              {data.abilities.map((ability, idx) => (
                <p key={idx}>{ability.ability.name}</p>
              ))}
            </div>
            <div className="pokemon-details-card">
              <h2 className="font-semibold">Types: </h2>
              {data.types.map((type, idx) => (
                <p
                  className="p-2 rounded min-w-[100px] m-1"
                  style={{ background: `${colours[type.type.name]}` }}
                  key={idx}
                >
                  {type.type.name}
                </p>
              ))}
            </div>
            <div className="pokemon-details-card">
              <h2 className="font-semibold">Stats: </h2>
              {data.stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="first-letter:uppercase p-1">
                    {stat.stat.name} {stat.base_stat}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <img
            className="max-w-[150px] my-4 justify-items-center"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <div>
            <div className="flex justify-around m-2">
              <img src={data.sprites.back_default} alt="" />
              <img src={data.sprites.front_default} alt="" />
              <img src={data.sprites.front_shiny} alt="" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PokemonDetails;
